import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponseModel, Applcation, Loan } from '../../model/application.model';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.scss'
})
export class LoanApplicationComponent {

  application: Applcation = new Applcation();
  loan: Loan = new Loan();

  masterSrv = inject(MasterService);

  addLoan() {
    const strObj =  JSON.stringify(this.loan);
    const newObj =  JSON.parse(strObj);
    this.application.Loans.unshift(newObj);
    this.loan =  new Loan();
  }

  onSubmit() {
    debugger;
    this.application.posted = true;
    this.masterSrv.addNewApplication(this.application).subscribe((Result:ApiResponseModel)=>{
      if(Result.posted) {
        alert("Loan Application Success")
      } else {
        console.log(Result)
      }
    }, error=>{
      alert(error)
    })
  }


}