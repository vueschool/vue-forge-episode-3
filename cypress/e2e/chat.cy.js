/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("customer support chat", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");
  });

  it("opens when the chat icon is clicked", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get(`[data-test="chat-widget-content"]`).should("not.exist");
    cy.get('[data-test="chat-widget-trigger"]').click();
    cy.get(`[data-test="chat-widget-content"]`).should("exist");
  });

  it("displays the user message on input + enter and displays the bots response ", () => {
    // Setup
    const message = "Hello Cypress";
    cy.get('[data-test="chat-widget-trigger"]').click();
    cy.intercept("POST", "/api/ai", {
      fixture: "chatbot-response.json",
    });

    // Test User input + enter
    cy.get(`[data-test="chat-input"]`)
      .should("be.visible")
      .type(`${message}{enter}`);
    cy.get(
      `[data-test="chat-bubble"]:first-of-type [data-test="chat-bubble-text"]`
    ).should("contain.text", message);

    // Test bot response
    cy.get(
      `[data-test="chat-bubble"]:last-of-type [data-test="chat-bubble-text"]`
    ).should(
      "contain.text",
      "Hello! How can I assist you with the 'Social Media Post Generator' app?"
    );
  });
});
