import FirstDayFareCalculatorHandler from "../../src/3/FirstDayFareCalculatorHandler";
import NormalFareCalculatorHandler from "../../src/3/NormalFareCalculatorHandler";
import NormalFareCalculator from "../../src/3/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../../src/3/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../../src/3/OvernightSundayFareCalculatorHandler";
import PeakTimeFareCalculatorHandler from "../../src/3/PeakTimeFareCalculatorHandler";
import Ride from "../../src/3/Ride";
import SundayFareCalculatorHandler from "../../src/3/SundayFareCalculatorHandler";

let ride: Ride;
beforeEach(function () {
    const normal = new NormalFareCalculatorHandler();
    const overnight = new OvernightFareCalculatorHandler(normal);
    const overnightsunday = new OvernightSundayFareCalculatorHandler(overnight);
    const sunday = new SundayFareCalculatorHandler(overnightsunday);
    const peakTime = new PeakTimeFareCalculatorHandler(sunday);
    const firstday = new FirstDayFareCalculatorHandler(peakTime);
    ride = new Ride(firstday);
});

test("Deve fazer uma corrida em um dia de semana em horário normal", function (){
    ride.addSegment(10, new Date("2021-03-10T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(21);
});

test("Deve fazer uma corrida em um dia de semana em horário noturno", function (){
    ride.addSegment(10, new Date("2021-03-10T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(39);
});

test("Deve fazer uma corrida em um domingo em horário normal", function (){
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(29);
});

test("Deve fazer uma corrida em um domingo em horário noturno", function (){
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(50);
});

test.each([
   "2021-03-07T07:00:00", "2021-03-07T07:30:00", "2021-03-07T08:00:00", "2021-03-07T08:30:00"
])("Deve fazer uma corrido em horário de pico entre as %p", function(date){
    ride.addSegment(10, new Date(date));
    const fare = ride.calculateFare();
    expect(fare).toBe(60);
})
//
test("Deve lançar um erro se a distância for inválida", function (){
    expect( () => ride.addSegment(-10, new Date("2021-03-07T00:00:00"))).toThrowError(new Error("Invalid distance"));
    
});

test("Deve lançar um erro se a data for inválida", function (){
    expect( () => ride.addSegment(10, new Date("abc"))).toThrowError(new Error("Invalid date"));
})

test("Deve fazer uma corrida com valor mínimo", function (){
    ride.addSegment(1, new Date("2021-03-10T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(10);
});

test("Deve fazer uma corrida grátis no dia 1", function () {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(100);
})