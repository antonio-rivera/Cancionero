const stringUtilsModule = {
  normalizeName(string: string): string {
    try {
      const name = string.toLowerCase().replaceAll(/[.,"';:<>{}()*&^%$#@!]/, "");
      return name.replaceAll(/(\b[a-z])/, '$1'.toUpperCase()).trim()

    } catch (error) {
      console.log(error);
      console.log(`Was not able to normalize name: ${string}`);
      return string

    }
  }

}

export default stringUtilsModule