import {
  dashboardUsers,
  getUserStatusPermissions,
  organizations,
  userTableData,
} from "./users-data";

describe("getUserStatusPermissions", () => {
  it("active user cannot activate but can be blacklisted", () => {
    const {
      canActivateUser,
      canBlacklistUser,
    } = getUserStatusPermissions("Active");
    expect(canActivateUser).toBe(false);
    expect(canBlacklistUser).toBe(true);
  });

  it("blacklisted user can be activated but cannot be blacklisted again", () => {
    const {
      canActivateUser,
      canBlacklistUser,
    } = getUserStatusPermissions("Blacklisted");
    expect(canActivateUser).toBe(true);
    expect(canBlacklistUser).toBe(false);
  });

  it("inactive user can both be activated and blacklisted", () => {
    const {
      canActivateUser,
      canBlacklistUser,
    } = getUserStatusPermissions("Inactive");
    expect(canActivateUser).toBe(true);
    expect(canBlacklistUser).toBe(true);
  });

  it("pending user can both be activated and blacklisted", () => {
    const {
      canActivateUser,
      canBlacklistUser,
    } = getUserStatusPermissions("Pending");
    expect(canActivateUser).toBe(true);
    expect(canBlacklistUser).toBe(true);
  });
});

describe("userTableData", () => {
  it("has the same length as dashboardUsers", () => {
    expect(userTableData.length).toBe(dashboardUsers.length);
  });

  it("each row contains exactly the expected 7 keys", () => {
    const expectedKeys = ["dateJoined", "email", "id", "organization", "phoneNumber", "status", "username"].sort();
    userTableData.forEach((row) => {
      expect(Object.keys(row).sort()).toEqual(expectedKeys);
    });
  });

  it("id values match dashboardUsers in order", () => {
    const tableIds = userTableData.map(r => r.id);
    const sourceIds = dashboardUsers.map(u => u.id);
    expect(tableIds).toEqual(sourceIds);
  });

  it("status field preserves the original value", () => {
    const sourceUser = dashboardUsers.find(u => u.id === "1");
    const tableRow = userTableData.find(r => r.id === "1");
    expect(tableRow?.status).toBe(sourceUser?.status);
  });
});

describe("organizations", () => {
  it("contains no duplicate organization names", () => {
    expect(organizations.length).toBe(new Set(organizations).size);
  });

  it("covers every organization name present in dashboardUsers", () => {
    dashboardUsers.forEach((user) => {
      expect(organizations).toContain(user.organization);
    });
  });

  it("every element is a string", () => {
    organizations.forEach((org) => {
      expect(typeof org).toBe("string");
    });
  });
});
