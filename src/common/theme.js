export const PRIMARY_COLOR = 'rgb(41, 50, 65)';
export const SECONDARY_COLOR = 'rgb(61, 90, 128)';
export const TERTIARY_COLOR = 'rgb(131, 158, 195)';
export const CONTRAST_COLOR = 'rgb(238, 108, 77)';
export const DELETE_COLOR = '#B22222';

export default {
  Button: {
    buttonStyle: {
      borderRadius: 5,
      backgroundColor: CONTRAST_COLOR,
    },
    containerStyle: {
      margin: 5,
    },
  },
  Avatar: {
    containerStyle: {
      backgroundColor: 'rgb(119, 119, 119)',
      justifyContent: 'center',
    },
    showAccessory: true,
    size: 'large',
    rounded: true,
  },
  Text: {
    style: {
      fontSize: 16,
      color: PRIMARY_COLOR,
    },
    h1Style: {
      color: PRIMARY_COLOR,
    },
    h2Style: {
      color: PRIMARY_COLOR,
    },
    h3Style: {
      color: SECONDARY_COLOR,
    },
    h4Style: {
      color: SECONDARY_COLOR,
    },
  },
  Input: {
    inputContainerStyle: {
      // borderWidth: 1,
      // borderColor: 'grey',
      // borderRadius: 10,
      // paddingHorizontal: 3,
      backgroundColor: 'white',
    },
    labelStyle: {
      color: SECONDARY_COLOR,
    },
  },
  Icon: {
    color: CONTRAST_COLOR,
  },
};
