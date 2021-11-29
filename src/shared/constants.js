import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  mutation forgetPassword($forgetPasswordInput: ForgetPasswordInput!) {
    forgetPassword(forgetPasswordInput: $forgetPasswordInput) {
      Message
    }
  }
`;

export const NEW_PASSWORD = gql`
mutation resetPassword($resetPasswordInput: ResetPasswordInput!) {
  resetPassword(resetPasswordInput: $resetPasswordInput) {
   Message
  }
}`;


export const CUSTOMER_SIGN_UP = gql`
  mutation createcustomer($createcustomerInput: CreatecustomerInput!) {
    createcustomer(createcustomerInput: $createcustomerInput) {
      id
      CustomerName
      Opportunity
      Email
      OpportunityType
      BusinessUnit
      ServiceType
      CCaccountid
      Discription
      EnterpriseAccountName
      TermStarDate
      TermEndDate
    }
  }
`;

export const SIGN_IN = gql`
mutation signIn($usersInput: SignInUsersInput!) {
  signIn(usersInput: $usersInput) {
    id
    accessToken
    Firstname
    Lastname
    Email
    ContactNo
    Message
    roles
  }
}
`
export const USER_SIGN_UP = gql`
  mutation signUp($createUsersInput: CreateUsersInput!) {
    signUp(createUsersInput: $createUsersInput) {
      id
      accessToken
      Firstname
      Lastname
      Email
      ContactNo
      CreatedUserId
      CreatedDate
      UpdatedDate
      roles
      Message
    }
  }
`;

export const GET_ALL_USERS = gql`
query {
  getAllUserss {
    id
    accessToken
    Firstname
    Lastname
    Email
    ContactNo
    CreatedUserId
    CreatedDate
    UpdatedDate
    roles
    Message
    }
  }
`;

export const GET_USER_ID = gql`
    query UsersById($id: String!) {
      UsersById(id: $id) {
        id
        accessToken
        Firstname
        Lastname
        Email
        ContactNo
        CreatedUserId
        CreatedDate
        UpdatedDate
        UserGroup{
          id
          GroupName
        }
        IsActive
        roles
        IsNotify
        Message
      }
    }
  `;

export const UPDATE_USER = gql`
    mutation updateUser($updateUserInput: UpdateUsersInput!, $id: String!) {
      updateUser(updateUserInput: $updateUserInput, id: $id) {
        id
        accessToken
        Firstname
        Lastname
        Email
        ContactNo
        CreatedUserId
        CreatedDate
        UpdatedDate
        roles
        Message
      }
    }
  `;

export const GET_ALL_CUSTOMERS = gql`
    query {
      getAllcustomers {
        id
        CustomerName
        Opportunity
        Email
        OpportunityType
        BusinessUnit
        ServiceType
        CCaccountid
        Discription
        EnterpriseAccountName
        TermStarDate
        TermEndDate
        UpdatedDate
      }
    }
  `;

export const GET_CUSTOMER_BY_ID = gql`
    query customerById($id: String!) {
      customerById(id: $id) {
        id
        CustomerName
        Opportunity
        Email
        OpportunityType
        BusinessUnit
        ServiceType
        CCaccountid
        Discription
        EnterpriseAccountName
        TermStarDate
        TermEndDate
        Streams
      }
    }
  `;

export const UPDATE_CUSTOMER = gql`
    mutation updatecustomer($updatecustomerInput: UpdatecustomerInput!, $id: String!) {
      updatecustomer(updatecustomerInput: $updatecustomerInput, id: $id) {
        id
        CustomerName
        Opportunity
        Email
        OpportunityType
        BusinessUnit
        ServiceType
        CCaccountid
        Discription
        EnterpriseAccountName
        TermStarDate
        TermEndDate
        Streams
      }
    }
  `;

export const GET_ALL_CUSTOMER_STREAMS = gql`
  query getAllCustomerStreams($id: String!){
    getAllCustomerStreams(id: $id) {
      id
      RatingGroupId
      ServiceId
      StreamId
      StreamName
      ApplicationName
      ChargeCategory
      ChargeFrequency
      TrafficClassificationCriteria
      APName
      TrafficIdentifier
      TestCriteria
      Note
      UpdatedUserId
      UpdatedDate
    }
  }
`;

export const SEND_NOTIFICATION_EMAIL = gql`
  query sendNotificationEmail($id: String!){
    sendNotificationEmail(id: $id) {
      CustomerName
    }
  }
`;

export const GET_ALL_STREAM_CUSTOMERS = gql`
  query getAllStreamCustomers($id: String!){
    getAllStreamCustomers(id: $id) {
      id
      CustomerName
      Opportunity
      Email
      OpportunityType
      BusinessUnit
      ServiceType
      CCaccountid
      Discription
      EnterpriseAccountName
      TermStarDate
      TermEndDate
      UpdatedUserId
      UpdatedDate
    }
  }
`;

export const GET_ALL_STREAMS = gql`
  query {
    getAllStreams {
      id
      RatingGroupId
      ServiceId
      StreamId
      StreamName
      ApplicationName
      ChargeCategory
      ChargeFrequency
      TrafficClassificationCriteria
      APName
      TrafficIdentifier
      TestCriteria
      Note
    }
  }
`;

export const GET_STREAM_BY_ID = gql`
query StreamById($id: String!) {
  StreamById(id: $id) {
    id
    RatingGroupId
    ServiceId
    StreamId
    StreamName
    ApplicationName
    ChargeCategory
    ChargeFrequency
    TrafficClassificationCriteria
    APName
    TrafficIdentifier
    TestCriteria
    Note
  }
}
`;

export const UPDATE_STREAM = gql`
mutation updateStream($updateStreamInput: StreamInput!, $id: String!) {
  updateStream(updateStreamInput: $updateStreamInput, id: $id) {
    RatingGroupId
    ServiceId
    StreamId
    StreamName
    ApplicationName
    ChargeCategory
    ChargeFrequency
    TrafficClassificationCriteria
    APName
    TrafficIdentifier
    TestCriteria
    Note
  }
}
`;

export const GET_LOGS_BY_ID = gql`
    query getAllLogs($id: String!) {
      getAllLogs(id: $id) {
        ParentId
        Message
      }
    }
  `;

export const GET_ALL_USERSGROUPS = gql`
  query {
    getAllUserGroups {
      id
      GroupName
      CreatedUserId
      CreatedDate
      UpdatedUserId
      UpdatedDate
    }
  }
`;

export const CREATE_USER_GROUP = gql`
  mutation createUserGroup($createUserGroupInput: CreateUserGroupInput!) {
    createUserGroup(createUserGroupInput: $createUserGroupInput) {
      id
      GroupName
      CreatedUserId
      CreatedDate
      UpdatedUserId
      UpdatedDate
    }
  }
`;