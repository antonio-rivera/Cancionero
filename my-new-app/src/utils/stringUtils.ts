const stringUtilsModule = {
  normalizeName(string: string): string {
    try {
      const name = string.toLowerCase().replaceAll(/[.,"';:<>{}()*&^%$#@!]/g, "");
      return name.replaceAll(/(\b[a-z])/g, (match: string) => match.toUpperCase()).trim();


    } catch (error) {
      console.log(error);
      console.log(`Was not able to normalize name: ${string}`);
      return string

    }
  }

}

export default stringUtilsModule