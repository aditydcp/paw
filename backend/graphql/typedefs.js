import { gql } from 'apollo-server-core'

const TypeDefs = gql`
    scalar Date

    type Course {
        id: String
        code: String
        name: String
        assignments: [Assignment]
    }

    type Assignment {
        id: ID
        title: String
        details: String
        deadline: Date
    }

    input CoursesQueryInput {
        keywords: String
        start: Int = 0
        count: Int = 100
    }

    input AssignmentsQueryInput {
        keywords: String
        start: Int = 0
        count: Int = 100
    }

    type Query {
        course(id: ID!): Course
        courses(input: CoursesQueryInput): [Course]
        assignment(id: ID!): Assignment
        assignments(input: AssignmentsQueryInput): [Assignment]
    }

    input CourseInput {
        code: String!
        name: String!
    }

    input AssignmentInput {
        title: String!
        details: String!
        deadline: Date!
    }

    type Mutation {
        createCourse(course: CourseInput!): Course
        updateCourse(id: ID!, course: CourseInput!): Course 
        deleteCourse(id: ID!): Course
        createAssignment(courseId: ID!, assignment: AssignmentInput!): Assignment
        updateAssignment(id: ID!, assignment: AssignmentInput!): Assignment
        deleteAssignment(id: ID!): Assignment 
    }

    type Subscription {
        assignmentCreated(courseId: ID!): Assignment
        assignmentUpdated(courseId: ID!): Assignment
        assignmentDeleted(courseId: ID!): ID
    }
`

export default TypeDefs