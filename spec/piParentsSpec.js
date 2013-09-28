describe("For condition qq qq qq", function () {
    it("it should return true when input is 12 12 12 12 12 12", function () {
        expect(condition_qq_qq_qq(12, 12, 12, 12, 12, 12)).toBe(true);
    });
    it("it should return false when input is 12 13 12 12 12 12", function () {
        expect(condition_qq_qq_qq(12, 13, 12, 12, 12, 12)).toBe(false);
    });
});

describe("For condition qq qq qr", function () {
    it("it should return true when input is 11 11 11 11 11 12", function () {
        expect(condition_qq_qq_qr(11, 11, 11, 11, 11, 12)).toBe(true);
    });
    it("it should return true when input is 11 11 11 11 12 11", function () {
        expect(condition_qq_qq_qr(11, 11, 11, 11, 12, 11)).toBe(true);
    });
    it("it should return false when input is 11 11 11 11 11 11", function () {
        expect(condition_qq_qq_qr(11, 11, 11, 11, 11, 11)).toBe(false);
    });
});

describe("For condition qq pq qq", function () {
    it("it should return true when input is 11 11 11 12 11 11", function () {
        expect(condition_qq_pq_qq(11, 11, 11, 12, 11, 11)).toBe(true);
    });
    it("it should return true when input is 11 11 12 11 11 11", function () {
        expect(condition_qq_pq_qq(11, 11, 12, 11, 11, 11)).toBe(true);
    });
    it("it should return false when input is 11 11 11 11 11 11", function () {
        expect(condition_qq_pq_qq(11, 11, 11, 11, 11, 11)).toBe(false);
    });
});

describe("For condition qq pq qr", function () {
    it("it should return true when input is 11 11 11 12 11 13", function () {
        expect(condition_qq_pq_qr(11, 11, 11, 12, 11, 13)).toBe(true);
    });
    it("it should return true when input is 11 11 12 11 11 13", function () {
        expect(condition_qq_pq_qr(11, 11, 12, 11, 11, 13)).toBe(true);
    });
    it("it should return true when input is 11 11 11 12 11 12", function () {
        expect(condition_qq_pq_qr(11, 11, 11, 12, 11, 12)).toBe(true);
    });
    it("it should return true when input is 11 11 11 12 12 11", function () {
        expect(condition_qq_pq_qr(11, 11, 11, 12, 12, 11)).toBe(true);
    });
    it("it should return false when input is 11 11 11 11 11 11", function () {
        expect(condition_qq_pq_qr(11, 11, 11, 11, 11, 11)).toBe(false);
    });
    it("it should return false when input is 11 11 11 11 11 12", function () {
        expect(condition_qq_pq_qr(11, 11, 11, 11, 11, 12)).toBe(false);
    });
});
//
//describe("For condition pq pp qq",function(){
//    it("it should return true when input is 11 12 11 11 12 12",function(){
//        expect(condition_pq_pp_qq(11,12,11,11,12,12)).toBe(true);
//    });
//});