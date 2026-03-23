import Order "mo:core/Order";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type PracticeArea = {
    #criminal;
    #civil;
    #family;
    #property;
    #divorce;
    #corporate;
  };

  func areaToText(area : PracticeArea) : Text {
    switch (area) {
      case (#criminal) { "Criminal" };
      case (#civil) { "Civil" };
      case (#family) { "Family" };
      case (#property) { "Property" };
      case (#divorce) { "Divorce" };
      case (#corporate) { "Corporate" };
    };
  };

  module PracticeArea {
    public func compare(area1 : PracticeArea, area2 : PracticeArea) : Order.Order {
      Text.compare(areaToText(area1), areaToText(area2));
    };
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type Booking = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    practiceArea : PracticeArea;
    preferredDate : Text;
    message : Text;
    status : BookingStatus;
    createdAt : Time.Time;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };

    public func compareByDate(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.preferredDate, booking2.preferredDate);
    };
  };

  let bookings = Map.empty<Nat, Booking>();
  var nextId = 1;

  // Public appointment booking - anyone can submit (including guests)
  public shared ({ caller }) func bookAppointment(
    name : Text,
    phone : Text,
    email : Text,
    practiceArea : PracticeArea,
    preferredDate : Text,
    message : Text,
  ) : async Nat {
    let booking : Booking = {
      id = nextId;
      name;
      phone;
      email;
      practiceArea;
      preferredDate;
      message;
      status = #pending;
      createdAt = Time.now();
    };
    bookings.add(nextId, booking);
    nextId += 1;
    booking.id;
  };

  // Admin only - view all bookings
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    let bookingList = bookings.values().toList<Booking>();
    let result = bookingList.toArray().sort(Booking.compareByDate);
    result;
  };

  // Admin only - update booking status
  public shared ({ caller }) func updateBookingStatus(id : Nat, status : BookingStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          booking with
          status
        };
        bookings.add(id, updatedBooking);
      };
    };
  };

  // Public query - anyone can view total booking count
  public query ({ caller }) func getTotalBookings() : async Nat {
    bookings.size();
  };
};
