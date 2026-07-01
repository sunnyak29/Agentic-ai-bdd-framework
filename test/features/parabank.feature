@test
Feature: ParaBank Sign Up and Sign In

  Background:
    Given User navigates to ParaBank application

  # REGISTRATION SCENARIOS
    @smoke @registration @test1
  Scenario: User successfully creates new account with valid details
    When User clicks on Register link
    And User fills registration form with valid details
    And User submits the registration form
    Then User should see success message "Your account was created successfully"
    And User should be logged in automatically

   @regression @registration 
  Scenario: Registration fails with duplicate username
    When User clicks on Register link
    And User tries to register with already existing username
    And User submits the registration form
    Then User should see error message "This username already exists"

  @test @regression @registration 
  Scenario: Registration fails when mandatory fields are empty
    When User clicks on Register link
    And User submits the registration form without filling any fields
    Then User should see validation errors for mandatory fields

  @test @regression @registration 
  Scenario: Registration fails when password and confirm password do not match
    When User clicks on Register link
    And User fills registration form with mismatched passwords
    And User submits the registration form
    Then User should see error message "Passwords did not match"

  # LOGIN SCENARIOS

  @test @smoke 
  Scenario: User successfully logs in with registered credentials
    When User creates a new account with valid details
    And User navigates to home page
    And User logs in with the created credentials
    Then User should be successfully logged in
    And User should see Account Overview page

  @test @regression 
  Scenario: Login fails with invalid username
    When User logs in with username "invalid_user_12345" and password "Test@1234"
    Then User should see login error "The username and password could not be verified"

  @test @regression 
  Scenario: Login fails with wrong password
    When User creates a new account with valid details
    And User navigates to home page
    And User logs in with correct username but wrong password "WrongPassword123"
    Then User should see login error "The username and password could not be verified"

  @test @regression 
  Scenario: Login fails when credentials are empty
    When User clicks login button without entering any credentials
    Then User should see login error "Please enter a username and password"

  # ACCOUNT BALANCE SCENARIOS

  @test @smoke 
  Scenario: User can view account balance after successful login
    When User creates a new account with valid details
    And User navigates to home page
    And User logs in with the created credentials
    Then User should see Account Overview page
    And Account balance should be displayed
    And Account balance should be printed to console

  # END-TO-END SCENARIOS

  @test @smoke 
  Scenario: Complete user journey - Register, Login, View Balance, Logout
    When User clicks on Register link
    And User fills registration form with valid details
    And User submits the registration form
    Then User should see success message "Your account was created successfully"
    And User should be logged in automatically
    When User navigates to Account Overview
    Then Account balance should be displayed
    And Account balance should be printed to console
    When User logs out
    Then User should be redirected to home page
