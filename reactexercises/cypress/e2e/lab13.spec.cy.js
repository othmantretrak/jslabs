describe("Test Lab 13 Load and find user from Autocomplet", () => {
  it("finds the server", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#menubtn").click();
    cy.contains("a", "Lab 13").click();
    cy.wait(1000);

    cy.get("#users").click().type("Farah T{downArrow}{enter}");

    cy.contains(
      "you selected Farah T, this user can be contacted at farah@test.com"
    );
  });
});
