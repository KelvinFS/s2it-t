import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


  constructor() { }

  title = 'S2IT Teste';

  transactions = [];
  copyTransactions = [];

  total = 0;
  model:any={};
  msgError:any="";
  msgSuccess:any="";

  depositCheckBox: boolean = false;
  withdrawCheckBox: boolean = false;

 
  ngOnInit() {
  	this.transactions = [
	  	{kind: "Deposito", value: 200},
	  	{kind: "Saque", value: 100},
	  	{kind: "Deposito", value: 50}
  	];
  	this.updateTotal();
  	this.copyTransactions = this.transactions;
  }

  updateTotal(){
  	let partial_total = 0;
  	for (let transaction of this.transactions) {
    	if(transaction.kind == 'Deposito'){
    		partial_total += transaction.value;
    	} else {
    		partial_total -= transaction.value;
    	}
   	}
   	this.total = partial_total;
  } 

  addTransaction(){

  	if(!this.depositCheckBox && !this.withdrawCheckBox){
  		this.msgError = "Escolha qual o tipo da operação.";
  		return;
  	}

  	if(this.model.value == "" || this.model.value == null){
  		this.msgError = "O campo valor deve ser preenchido.";
  		return;
  	}

  	if(this.model.value < 0 || this.model.value > 9999999){
  		this.msgError = "O campo valor deve ser entre 0 e 9999999";
  		return;
  	}
  	

  	if(this.depositCheckBox){
  		this.model.kind = 'Deposito';
  	} else {
  		this.model.kind = 'Saque';	
  	}

    this.transactions.push(this.model);
    this.model = {};
    this.msgSuccess = "Transação adicionada... "; 
    this.updateTotal();
    this.copyTransactions = this.transactions;
    this.depositCheckBox = false;
    this.withdrawCheckBox = false;
  }

  deleteTransaction(i){
    this.transactions.splice(i,1);
    this.msgSuccess = "Transação removida... ";
    this.updateTotal();
  }

  	sortType(sort) {
        if (sort === 'kind') {
            this.transactions = this.copyTransactions.sort(this.sortByKind);
        }
        if (sort === 'value') {
            this.transactions = this.copyTransactions.sort(this.sortByValue);
        }
   };

	sortByKind = function (t1, t2) {
        if (t1.kind > t2.kind)
            return 1;
        else if (t1.kind === t2.kind)
            return 0;
        else
            return -1;
    };

    sortByValue = function (t1, t2) {
        return parseInt(t1.value) - parseInt(t2.value);
    };

  clickMe(){
    this.msgSuccess = "";
    this.msgError = "";
  }

  unsetDepositCheckBox(){
  	this.depositCheckBox = false;
  }
  unsetWithdrawCheckBox(){
  	this.withdrawCheckBox = false;
  }

}
