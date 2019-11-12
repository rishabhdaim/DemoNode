/**
 * Created by diam on 05/08/19.
 */

function postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy()
}

function votes(parent, args, context) {
    return context.prisma.link({ id: parent.id }).votes()
}

module.exports = {
    postedBy,
    votes
};