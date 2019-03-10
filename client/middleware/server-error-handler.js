// Deprecated, But keep it.

export default nuxtCtx => {
  const { req, error } = nuxtCtx;
  if (process.client) return;
  if (!req.error) return;
  error({
    statusCode: req.error.status || req.error.statusCode || 500,
    message: req.error.message || `an fatal error as occurred`
  });
};
