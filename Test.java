public class Test {
	private String C1 = "";//Child
	private String C2 = "";
	private String AF1 = "";//A random man is the Father
	private String AF2 = "";
	private String M1 = "";//Mother
	private String M2 = "";
	private String formula;
	private String PI = "";
	private float c1Probability;
	private float c2Probability;
	private float af1Probability;
	private float af2Probability;

	public void triplet() {
		if (C1.equals(C2)) {// 孩子是纯合子
			if ((C1.equals(AF1) || C1.equals(AF2)) && (C1.equals(M1) || C1.equals(M2))) {// 要求孩子的等位基因必须来自于父亲和母亲
				if (AF1.equals(AF2)) {/** 父亲是纯合子（1,2） **/
					formula = "1/p";
					PI = String.valueOf(1 / c1Probability);
				} else {/** 父亲是杂合子（5,6） **/
					formula = "1/2p";
					PI = String.valueOf(1 / (c1Probability * 2));
				}
			}
		} else if (!C1.equals(C2)) {// 孩子是杂合子
			if (!M1.equals(M2) && (C1.equals(M1) || C1.equals(M2)) && (C2.equals(M1) || C2.equals(M2))) {// 孩子和母亲相同（7,8,9）
				if ((AF1.equals(C1) || AF1.equals(C2)) && (AF2.equals(C1) || AF2.equals(C2))) {// 父亲的等位基因中都与孩子的相同
					formula = "1/(p+q)";
					PI = String.valueOf(1 / (c1Probability + c2Probability));
				} else if (((AF1.equals(C1) || AF1.equals(C2)) && (!AF2.equals(C1) && !AF2.equals(C2))) || ((AF2.equals(C1) || AF2.equals(C2)) && (!AF1.equals(C1) && !AF1.equals(C2)))) {
					formula = "1/(2p+2q)";
					PI = String.valueOf(1 / (2 * c1Probability + 2 * c2Probability));
				}
			} else {// 孩子和母亲不同（2,4）
				if (AF1.equals(AF2)) {// 父亲是纯合子（2）
					formula = "1/p";
					PI = String.valueOf(1 / c1Probability);
				} else {//父亲是杂合子（4）
					formula = "1/2p";
					PI = String.valueOf(1 / (2 * c1Probability));
				}
			}
		}
		System.out.println(AF1 + "/" + AF2 + "," + M1 + "/" + M2 + "," + C1 + "/" + C2 + "," + formula + "," + PI);
	}

	public void singleParent() {
		// 两个纯合子
		if (AF1.equals(AF2) && C1.equals(C2) && AF1.equals(C1)) {
			formula = "1/p";
			PI = String.valueOf(1 / af1Probability);
		}
		// 一个纯合子和一个杂合子
		if (AF1.equals(AF2) || C1.equals(C2)) {
			if (!AF1.equals(AF2)) {
				// pq pp
				if (AF1.equals(C1)) {
					formula = "1/2p";
					PI = String.valueOf(1 / (2 * af1Probability));
					// qp pp
				} else if (AF2.equals(C1)) {
					formula = "1/2p";
					PI = String.valueOf(1 / (2 * af2Probability));
				}
			} else if (!C1.equals(C2)) {
				// pp pq
				if (C1.equals(AF1)) {
					formula = "1/2p";
					PI = String.valueOf(1 / (2 * c1Probability));
					// pp qp
				} else if (C2.equals(AF1)) {
					formula = "1/2p";
					PI = String.valueOf(1 / (2 * c2Probability));
				}
			}
		}
		// 两个都是杂合子
		if (!AF1.equals(AF2) && !C1.equals(C2)) {
			// pq pq
			if ((AF1.equals(C1) || AF1.equals(C2)) && (AF2.equals(C1) || AF2.equals(C2))) {
				formula = "(p+q)/4pq";
				PI = String.valueOf((af1Probability + af2Probability) / (4 * af1Probability * af2Probability));
			}
			// pq qr
			if ((AF1.equals(C1) || AF1.equals(C2)) && (!AF2.equals(C1) && !AF2.equals(C2))) {
				formula = "1/4p";
				PI = String.valueOf(1 / (4 * af1Probability));
			}
			// qp qr
			if ((AF2.equals(C1) || AF2.equals(C2)) && (!AF1.equals(C1) && !AF1.equals(C2))) {
				formula = "1/4p";
				PI = String.valueOf(1 / (4 * af2Probability));
			}
		}
		System.out.println(AF1 + "/" + AF2 + "," + C1 + "/" + C2 + "," + formula + "," + PI);
	}
}
