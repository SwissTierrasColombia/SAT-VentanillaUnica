import { Injectable } from '@angular/core';

@Injectable()
export class RoleModel {

  administrator: string;
  citizen: string;
  entity: string;

  constructor() {
    this.administrator = '5d710564330f7d7cd67ee491';
    this.citizen = '5d7105cb698085331067bf8f';
    this.entity = '5d7107e7a6a3e77e5fe15217';
  }

}
