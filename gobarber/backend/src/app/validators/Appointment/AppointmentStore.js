import * as Yup from 'yup';

export const schema = Yup.object().shape({
  provider_id: Yup.number().required(),
  date: Yup.date().required(),
});

export default async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'validation fails', messages: error.inner });
  }
};
