Feature: ParaBank Homepage Services

  Background:
    Given User opens the ParaBank homepage
@home
  Scenario: User clicks Services from homepage and verifies service data
    When User clicks the Services link from the homepage
    Then User should see the Services page title "ParaBank | Services"
    And User should see service page content "Available Bookstore SOAP services"
    And User should see service data for "Bookstore"
