const { CYCLIC_KEY } = require("@storybook/addon-actions");

beforeEach(() => {
  cy.request("GET", "api/debug/reset");
  cy.visit("/");
  cy.contains("Monday");
});

describe("Appointments", () => {
  it("should book an interview", () => {
    cy.get(
      "#root > main > section.schedule > article:nth-child(2) > main > img"
    ) //used [alt=Add]
      .first()
      .click()
      .get(
        "#root > main > section.schedule > article:nth-child(2) > main > section.appointment__card-left > form > input"
      ) //used [data-testid=student-name-input] from Form component
      .type("Lydia Miller-Jones")
      .get(
        "#root > main > section.schedule > article:nth-child(2) > main > section.appointment__card-left > section.interviewers > ul > li:nth-child(1)"
      ) // used [alt='Sylvia Palmer']
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get(
      "#root > main > section.schedule > article:nth-child(1) > main > section.appointment__card-right > section > img:nth-child(1)"
    )
      .first()
      .click({ force: true });

    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Tony Yu")
      .get(":nth-child(2) > .interviewers__item-image")
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Tony Yu");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get(
      "#root > main > section.schedule > article:nth-child(1) > main > section.appointment__card-right > section > img:nth-child(2)"
    )
      .first()
      .click({ force: true });

    cy.get(
      "#root > main > section.schedule > article:nth-child(1) > main > section > button:nth-child(2)"
    ).click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
