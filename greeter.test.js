const Greeter = require('./greeter');

describe("Greeter", () => {
  describe("greet", () => {
    it("should be defined", () => {
      const greeter = new Greeter()
      expect(greeter.greet).not.toBeUndefined();
    });

    it('should should return Hello and a name', () => {
      const greeter = new Greeter();
      expect(greeter.greet('Erick')).toBe('Hello Erick');
    })

    it('should trim the input', () => {
      const greeter = new Greeter();
      expect(greeter.greet('   los tigres tigrean                 ')).toBe('lostigrestigrean');
    })


    it('should capitalize the first letter', () => {
      const greeter = new Greeter();
      expect(greeter.greet('hola')).toBe('Hola');
    })

    it('should return Good morning name', () => {
      const greeter = new Greeter();
      expect(greeter.greet('Pedro')).toBe('Good morning Pedro');
    })

  });
});