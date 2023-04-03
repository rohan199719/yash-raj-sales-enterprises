import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const bodyWhite = (theme) => `
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.inverse};
`;
const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;
const captionMedium = (theme) => `
    font-size: ${theme.fontSizes.captionMedium};
    font-weight: ${theme.fontWeights.bold};
`;
const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;
const labelSmall = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.medium};
`;
const inputlabel = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.light};
`;

const title = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};
    

`;

const title_white = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.inverse};
    

`;
const caption_white = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.inverse};
`;

const variants = {
  title,
  title_white,
  body,
  bodyWhite,
  label,
  labelSmall,
  inputlabel,
  caption,
  caption_white,
  captionMedium,
  error,
  hint,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
