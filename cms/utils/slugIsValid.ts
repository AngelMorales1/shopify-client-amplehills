const SLUG_REG_EXP = '^[a-z0-9](-?[a-z0-9])*$';

export default (slug: string) => {
  if (new RegExp(SLUG_REG_EXP).test(slug)) return true;

  return 'Only lowercase letters, numbers, hyphens.';
};
