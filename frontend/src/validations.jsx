import moment from "moment";


export function stripeCardNumberValidation(cardNumber) {
    cardNumber.replace(/[^\d]/g, "")
        if(cardNumber) {
          return cardNumber &&
            /^[1-6]{1}[0-9]{14,15}$/i.test(
              cardNumber.replace(/[^\d]/g, "").trim()
            )
            ? ""
            : "Enter a valid Card";
        }
      
    
    return "Enter a valid Card";
  }
  

export const stripeCardExpirValidation = (value) => {
  if (value) {
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      let CurrentDate = moment(
        new Date(
          today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        )
      );
      let visaValue = value.split("/");
      let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
      return CurrentDate < moment(visaDate)
        ? undefined
        : "Please enter valid date";
    } else {
      return "Invalid date format";
    }
  }
};

export const textWithSpacesOnly = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return "Only alphabets";
    }
  } else {
    return undefined;
  }
};