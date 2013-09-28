describe("For condition qq and qq", function() {
    it("it should return true when input is 12 12 12 12", function() {
        expect(condition_qq_qq(12,12,12,12)).toBe(true);
    });

    it("it should return false when input is 12 13 12 12", function() {
        expect(condition_qq_qq(12,13,12,12)).toBe(false);
    });
});

describe("For condition pq and qq", function() {
    it("it should return true when input is 11 12 12 12", function() {
        expect(condition_pq_qq(11,12,12,12)).toBe(true);
    });

    it("it should return true when input is 12 13 12 12", function() {
        expect(condition_pq_qq(12,13,12,12)).toBe(true);
    });

    it("it should return false when input is 12 12 12 12", function() {
        expect(condition_pq_qq(12,12,12,12)).toBe(false);
    });

    it("it should return false when input is 12 13 12 13", function() {
        expect(condition_pq_qq(12,13,12,13)).toBe(false);
    });
});