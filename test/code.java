class Foo {
    private double big = 3.2e+23; // Some sort of big value
    private double small = -4.70e-9; // Some sort of small value

    private string message = "FooBarBaz";
    private char newline = '\n';

    private int hex = 0x0A0B0C;
    private int octal = 0737;
    private int binary = 0b01001001110;

    private boolean flag = false;

    private string multiline = """
        Hello, World!
        Who I am?
    """;

    /**
     * Multiline comment
     * Starts the program
     */
    public void main(string[] args) {
        int size = 3;
        int [size] array = { 1, 2, 3 };
        int index = 0;
        double e = 2.73;
        double a = 3.1415926535;
        while (index != 0) {
            index = index - 1;
            var coefficient = big * small / hex;
            println(message, array[index] * coefficient, newline);
        }
        for (var num : array) {
            var coefficient = big * small / hex;
            println(message, num * coefficient, newline);
        }
        var secret = hex ^ octal ^ binary;
        if (flag && size || secret) {
          println(secret ^ flag);
        }
        println(secret);
    }
}
