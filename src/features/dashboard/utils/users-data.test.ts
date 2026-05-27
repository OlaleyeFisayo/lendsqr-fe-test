import {
  dashboardUsers,
  getDashboardUserById,
  organizations,
  userTableData,
} from "./users-data";

describe("getDashboardUserById", () => {
  it("returns the user matching a valid id", () => {
    const user = getDashboardUserById("1");
    expect(user).toBeDefined();
  });

  it("returned user id matches the queried id", () => {
    const user = getDashboardUserById("1");
    expect(user?.id).toBe("1");
  });

  it("returns undefined for a non-existent id", () => {
    expect(getDashboardUserById("non-existent-id-99999")).toBeUndefined();
  });

  it("returns undefined when called with undefined", () => {
    expect(getDashboardUserById(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getDashboardUserById("")).toBeUndefined();
  });

  it("exact match only — id '1' does not return user with id '10'", () => {
    const user = getDashboardUserById("1");
    expect(user?.id).not.toBe("10");
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
