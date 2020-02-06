const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error(`Unauthorized`)
  }

  return next(root, args, context, info)
}

module.exports = {
  authenticated,
}
