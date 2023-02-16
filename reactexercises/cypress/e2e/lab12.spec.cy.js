describe("Test Lab 12 Sentence Builder Autocomplet", () => {
  it("finds the server and builds a sentence", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#words").click().type("{downArrow}{enter}");
    cy.get("#words").click().type("{downArrow}{enter}");
    cy.get("#words").click().type("{downArrow}{enter}");
    cy.get("#words").click().type("{downArrow}{enter}");
    cy.get("#words").click().type("{downArrow}{enter}");
    cy.get("#words").click().type("{downArrow}{enter}");

    cy.contains("Hi I build a sentense Farah T");
  });
});
