export class Location {
  constructor(private name: string,
              private coordinateX: number,
              private coordinateY: number,
              private layer: number,
              private image: string) {}

  public getName(): string {
    return this.name;
  }
  public getCoordinateY(): number {
    return this.coordinateY;
  }
  public getCoordinateX(): number {
    return this.coordinateX;
  }
  public getLayer(): number {
    return this.layer;
  }
  public getImage(): string {
    return this.image;
  }
}
