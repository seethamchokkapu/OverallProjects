
public class AtmJava {
	import java.util.Scanner;

	public class ATMCorrection {
		static int acpw[][] = { { 939233, 63050 }, { 1234, 5678 }, { 654, 7654 } };
		static int option;

		public static void main(String[] args) {
			Scanner sc = new Scanner(System.in);
			int i = 0;
			while (i==0) {
				System.out.println("WELCOME");
				System.out.println("enter your account no");
				int acno = sc.nextInt();
				for (int j = 0; j < 2; j++) {

					if (acpw[i][j] == acno || acpw[i][++j] == acno) {
						System.out.println("enter your password");
						int password = sc.nextInt();
						if (acpw[++i][j] == password || acpw[i++][j++] == password) {
							System.out.println("wecome to naidus bank your account number is=" + acno);
							/*
							 * System.out.println("choose your option"); int option=sc.nextInt();
							 */  
							System.out.println("option1.check bank balance");
							System.out.println("option2.withdraw");
							System.out.println("option3.deposit");
							System.out.println("option4.exist");
							int k=0;
							 do{
								 
							System.out.println("choose your option");
							 option = sc.nextInt();
							switch(option) {
							case 1:System.out.println("your ac balance is=" + acpw[++i][j]);
								
								break;
							
							case 2:
								System.out.println("your option is withdrawal amout");
								System.out.println("it will be coming soon");
								
								break;

							
							case 3:
								System.out.println("your option is deposit amount");
								System.out.println("it will be coming soon");
								
								break;
							
							case 4:
								System.out.println("exit");
								System.out.println("thank you visit again");
								i=0;
								break;

							
							default:
								System.out.println("your option is wrong please reenter correct option");
								i=0;
								break;
								
							}
							
							 
							 }while(option !=4);
						
						}
						else {
							System.out.println("your password is wrong please reenter ac details");
							i=0;
							break;
						}
					}
					else {
						System.out.println("your ac details are wrong please reenter ac details");
						i=0;
						break;
					
					}
				}
			}

		}

		}
}
