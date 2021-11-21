import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    serialize(value) {
        return value.toISOString()
    },
    parseValue(value) {
        return new Date(value)
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value))
        }
        
        return null
    }
})

export default dateScalar