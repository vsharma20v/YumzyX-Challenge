import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private detailsService: DetailsService,
    private spinner: NgxSpinnerService
  ) {}

  name: string = '';
  phoneNo: string = '';
  emailId: string = '';
  address: string = '';
  outletName: string = '';
  mobile: string = '';
  mobile2: string = '';
  mobile3: string = '';
  email: string = '';
  addressLine: string = '';
  orderDate: string = '';
  order: Array<any> = [];

  setCustomerDetails(customer: any) {
    const { customerName, phoneNo, emailId, address } = customer;
    this.name = customerName;
    this.phoneNo = phoneNo;
    this.emailId = emailId;
    this.address = address.fullAddress;
  }

  setRestaurantDetails(restaurant: any) {
    const { outletName, mobile, mobile2, mobile3, email, address } = restaurant;
    this.outletName = outletName;
    this.mobile = mobile;
    this.mobile2 = mobile2;
    this.mobile3 = mobile3;
    this.email = email;
    this.addressLine = address.addressLine;
  }

  ngOnInit(): void {
    this.detailsService.getAllDetails().subscribe(
      (resp) => {
        console.log(resp);
        if (resp.type === 'success') {
          const { customerStatus, orderDetails, restaurantStatus, orderDate } =
            resp.data;
          this.setCustomerDetails(customerStatus);
          this.setRestaurantDetails(restaurantStatus);
          this.order = orderDetails;
          this.orderDate = orderDate;
          this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}
