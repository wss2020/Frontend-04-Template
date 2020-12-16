class Car {
    private number: number;

    constructor(num: number) {
        this.number = num;
    }
    add():void{
        this.number+=1
    }
    del():void{
        this.number-=1
    }
    getNum():number{
        return this.number;
    }
}

let car = new Car(1);
car.add();
car.add();
car.add();
console.log(car.getNum());
