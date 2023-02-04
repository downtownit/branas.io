import { calculateRide } from "../../src/2/main";

test("Deve fazer uma corrida em um dia de semana em horário normal", function () {
    //given, arrange
    const segments = [
        { distance: 10, date: new Date("2021-03-10T10:00:00") }
    ];
    //when, act
    const fare = calculateRide(segments);
    //then, assert
    expect(fare).toBe(21);
});

test("Deve fazer uma corrida em um dia de semana em horário noturno", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-10T23:00:00") }
    ];
    const fare = calculateRide(segments);
    expect(fare).toBe(39);
});

test("Deve fazer uma corrida em um domingo e em horário normal", function (){
    const segments = [
        {distance: 10, date: new Date("2021-03-07T10:00:00")}
    ];
    const fare = calculateRide(segments);
    expect(fare).toBe(29);
});

test("Deve fazer uma corrida em um domindo e em horário noturno", function (){
    const segments = [
        { distance: 10, date: new Date("2021-03-07T23:00:00") }
    ];
    const fare = calculateRide(segments);
    expect(fare).toBe(50);
});

test("Deve retornar -1 se a distância for inválida", function (){
    const segments = [
        { distance: -10, date: new Date("2021-03-07T00:00:00")}
    ];
    expect(() => calculateRide(segments)).toThrow(new Error("Invalid distance"));
});

test("Deve retornar -2 se a data for inválida", function (){
    const segments = [
        { distance: 10, date: new Date("abs")}
    ];
    expect(() => calculateRide(segments)).toThrow(new Error("Invalid date"));
});

test("Deve fazer uma corrida com distância superior a 10", function (){
    const segments = [
        { distance: 1, date: new Date("2021-03-07T00:00:00")}
    ];
    const fare = calculateRide(segments);
    expect(fare).toBe(10);
});