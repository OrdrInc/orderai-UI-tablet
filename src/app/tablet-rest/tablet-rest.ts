import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Pusher from 'pusher-js';
import { AppService } from './../app.service';
import { Howl } from 'howler';
import { NewService } from '../new.service';
declare var $: any;

@Component({
  //selector: 'app-root',
  templateUrl: './tablet-rest.html',
  //styleUrls: ['./app.component.css']
})
export class TabletRestComponent implements OnInit {
  // @ViewChild("name") nameField: ElementRef;
  extendeta: boolean = false;
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;
  customLoadingTemplate: any;
  storePinlengthMessage: boolean = false;
  pinAttempt: number = 0;
  storePinDisplay: boolean = false;
  pusher: any;
  channel: any;
  customtime: any;
  data: any = [];
  pause: boolean = false;
  id: any;
  state: string = '';
  datas: any;
  orderCount: number = 0;
  landscape: boolean = false;
  orderFlow: boolean = false;
  orderDetail: any = [];
  customnFlag: boolean = false;
  public loading = false;

  //order items
  time: any = [];
  qty: any = [];
  items: any = [];
  toppings: any = [];
  amounts: any = [];
  itemNames: any = [];
  sizes: any = [];
  cursts: any = [];
  firstHalf: any = [];
  secondHalf: any = [];
  bake: any = [];
  crustTopper: any = [];
  sauce: any = [];
  sides: any = [];
  dressing: any = [];
  seasoning: any = [];
  drizzle: any = [];
  bread: any = [];
  cheese: any = [];
  sauceBase: any = [];
  dipping: any = [];
  cut: any = [];
  wingType: any = [];
  seasoningPackets: any = [];
  notApplicable: any = [];
  couponName: any;
  delivery_fee = '0.00';
  saving = '0.00';
  subtotal = '0.00';
  tax = '0.00';
  total = 0;
  tip: any = 0.0;
  itemsTotal = '0.00';
  grandTotal = ' ';
  initateRefund: boolean = true;
  fullRefund: boolean = false;
  partialRefund: boolean = false;
  itemRefund: boolean = false;
  refundComfirmation: boolean = false;
  keywordText = '0';
  errorText = '0';
  irrelevantText = '0';
  naItems = '0';
  splitdata: boolean = false;
  tNum: any;
  isFullFooter = true;
  reason: string = '';
  partialRefundAmount: string = '';
  partialRefundReason: string = '';
  customTime: any;
  itemRefundReason: any;
  type: any;
  amount: any;
  reasonrefund: any = 'Managers decision';
  refundSummary: boolean = false;
  storePIN: any = '';
  item: any;
  singleItemRefund: boolean = false;
  restStatus: boolean = false;
  noOrders: boolean = true;
  resturantName: any;
  InitalPopcount: number = 0;
  tempETA: any;
  mainRestId: any;
  audio: any;
  audio1 = new Audio();
  isPaid: any;
  playaudio: string = 'false';
  refreshIntervalId: any;
  tempcolor: any = '';
  storeDate: any;
  eta: any = {
    pickup: {
      timeslot1: '10-15',
      timeslot2: '15-20',
      timeslot3: '20-25',
    },
    delivery: {
      timeslot1: '20-25',
      timeslot2: '30-45',
      timeslot3: '60+',
    },
  };
  extendPickup: any;
  extendDelivery: any;
  storemetrics: any = [];
  extendPickupTemp: any;
  extendDeliveryTemp: any;
  smallload: boolean = false;
  redplay: number = 0;
  customTimeFlag: boolean = false;
  sound = new Howl({
    src: ['../../../assets/sounds/slow-spring-board.mp3'],
    autoplay: true,
    loop: true,
  });
  constructor(
    private service: AppService,
    private ngZone: NgZone,
    public api: NewService,
  ) {
    //var link = document.getElementById('mylink');

    //const {Howl, Howler} = require('howler');
    this.sound.stop();
    $('#modalPush').modal({
      backdrop: 'static',
      keyboard: false,
    });
    window.onresize = (e) => {
      //ngZone.run will help to run change detection
      this.ngZone.run(() => {
        if (window.matchMedia('(orientation: portrait)').matches) {
          this.landscape = false;
          this.orderDetail.color = this.tempcolor;
          // location.reload();
        }

        if (window.matchMedia('(orientation: landscape)').matches) {
          this.landscape = true;
        }
      });
    };
    this.pusher = new Pusher('8892259dee5062541bfb', {
      cluster: 'us2',
      forceTLS: true,
    });
    //
    var str = window.location.href;
    var res = str.split('rest/');
    this.id = res[1];
    console.log(res[1]);
    this.channel = this.pusher.subscribe(res[1]);
    this.channel.bind('send_order', (data: any) => {
      console.log('before pusher');
      console.log(data);
      if (data.restaurant.refreshStatus == true) {
        this.sound.stop();
        this.getInitValues();
      } else {
        this.push(data);
      }
      console.log('testing the pusher data');
      console.log(data);
    });
  }
  test() {
    console.log('test');
  }

  resetRefundVariables() {
    this.reason = '';
    this.partialRefundAmount = '';
    this.partialRefundReason = '';
    this.customTime = '';
    this.itemRefundReason = '';
    this.type = '';
    this.amount = '';
    this.storePIN = '';
    this.item = '';
    this.singleItemRefund = false;
    this.pinAttempt = 0;
    this.storePinlengthMessage = false;
    this.storePinDisplay = false;
  }
  refundClick() {
    this.resetRefundVariables();
    this.initateRefund = true;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    this.refundSummary = false;
  }

  refundType(type: any) {
    if (type == 'FULL') {
      /* this.initateRefund = false;
            this.fullRefund = true;
            this.partialRefund = false;
            this.itemRefund = false;
            this.refundSummary = false;*/
      this.submitRefundRequest(type);
    }
    if (type == 'PARTIAL') {
      this.partialRefundAmount = '';
      this.partialRefundReason = '';
      this.initateRefund = false;
      this.fullRefund = false;
      this.partialRefund = true;
      this.itemRefund = false;
      this.refundSummary = false;
    }
    if (type == 'ITEM') {
      this.initateRefund = false;
      this.fullRefund = false;
      this.partialRefund = false;
      this.itemRefund = true;
      this.refundSummary = false;
    }
  }
  submitRefundRequest(type: any) {
    var coupon = this.orderDetail.paidDollarValue.couponValue.coupons;
    Object.keys(coupon).forEach(function (key) {
      var value = coupon[key];
      coupon = parseInt(value);
      //console.log(key + ':' + value);
    });
    console.log(coupon);
    // console.log(coupon.value);
    this.refundSummary = true;
    this.initateRefund = false;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    if (type == 'FULL') {
      this.singleItemRefund = false;
      this.type = 'Full Refund';
      this.amount = this.orderDetail.paidDollarValue.paidTotal;
      this.amount = this.amount;
    }
    if (type == 'PARTIAL') {
      this.singleItemRefund = false;
      this.type = 'Partial  Refund';
      this.amount = this.partialRefundAmount;
    }
    if (type == 'ITEM') {
      this.singleItemRefund = true;
      this.type = 'Item  Refund';
      this.item = (<HTMLInputElement>document.getElementById('item')).value;

      for (var i = 0; i < this.orderDetail.items.length; i++) {
        if (this.orderDetail.items[i].item.name == this.item) {
          this.amount = this.orderDetail.items[i].item.price;
          this.amount = this.amount.substr(1);
          console.log(this.amount);
        }
      }
      this.amount = (this.amount * (100 - coupon)) / 100;
      this.amount = this.amount.toFixed(2);
    }
  }

  finalRefund() {
    var orderid = this.orderDetail.orderStatus.orderId;
    var reason = this.reasonrefund;
    var amount = this.amount;
    var date = new Date();
    var refundtype = this.type;
    this.loading = true;
    this.service.checkPin(this.mainRestId, this.storePIN).subscribe(
      (data) => {
        this.loading = false;
        if (data.pinStatus == true) {
          this.pinAttempt = 0;
          let data = {
            orderId: orderid,
            refundSource: 'from rest tablet',
            dollarValue: this.amount.toString(),
            reason: this.reasonrefund,
            refundType: this.type,
            refundMsg: 'refund',
          };

          this.api.finalRefundNew(data);
          this.api.getfinalRefundNew().subscribe(
            (data) => {
              this.loading = false;
              if (data.status == 200) {
                for (var i = 0; i < this.data.length; i++) {
                  if (this.data[i].orderStatus.orderId == orderid) {
                    this.data[i].timer = -1;
                    this.data[i].orderStatus.refundStatus = true;
                    this.data[i].color = 'refunded';
                    this.tempcolor = 'refunded';
                    this.data[i].orderStatus.ETA = 'REFUND';
                  }
                }
                $('#refund-modal').modal('show');
                $('#refund').modal('hide');
              }
            },
            (error) => {
              this.loading = false;
              console.log(error);
            },
          );
        } else {
          this.pinAttempt = this.pinAttempt + 1;
          if (this.pinAttempt > 3) {
            /*this.service.resetPin(this.mainRestId).subscribe(
                          data => {
                            this.loading = false;
                            if (data.status == 200) {
               
                            }
                          },
                          error => {
                            this.loading = false;
                            console.log(error);
                          });*/
          }
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }

  replaceUndefined(val: any) {
    if (typeof val === 'undefined') {
      return '-1';
    } else {
      console.log('cap result');
      console.log(this.capitialize(val));
      return this.capitialize(val);
    }
  }
  capitialize(val: any) {
    // console.log('@cap')
    // console.log(val)
    val = val.toLowerCase().trim();
    const newArr: any = [];
    if (val.includes(',')) {
      // console.log('Comma seperated string')
      // console.log(val)
      const arr = val.split(',');
      arr.map((x: any) => {
        if (x.includes('_')) {
          x = x.trim();
          newArr.push(this.replaceUnderScore(x));
        } else if (x.includes(' ')) {
          x = x.trim();
          newArr.push(this.spaceAfter(x));
        } else if (x.includes('-')) {
          x = x.trim();
          newArr.push(this.hyphenRemoval(x));
        } else {
          x = x.trim();
          newArr.push(this.FirstWord(x));
        }
      });
      // console.log(newArr)
      const word = newArr.join();
      return word;
    } else {
      if (val.includes('_')) {
        return this.replaceUnderScore(val);
      } else if (val.includes('-')) {
        return this.hyphenRemoval(val);
      } else if (val.includes(' ')) {
        console.log('space ');
        //console.log(val)
        //console.log('after er')
        // console.log(this.spaceAfter(val))
        return this.spaceAfter(val);
      }
      //console.log('Single word string')
      //console.log(val)
      return this.FirstWord(val);
    }
  }
  replaceUnderScore(val: any) {
    const indexVal = val.indexOf('_') + 1;
    let prefix = val.substring(0, indexVal - 1);
    prefix = prefix.charAt(0).toUpperCase() + prefix.substr(1);
    val = val.charAt(indexVal).toUpperCase() + val.substr(indexVal + 1);
    val = this.FirstWord(val);
    val = val.replace(/_/g, ' ');
    const reVal = `${prefix} ${val}`;
    return reVal;
  }
  spaceAfter(val: any) {
    if (this.numOfSpaces(val) > 1) {
      // console.log('SpaceAfter')
      // console.log(val)
      const firstIndex = val.indexOf(' ') + 1;
      let prefixval = val.substring(0, firstIndex - 1);
      val = val.charAt(0).toUpperCase() + val.substr(1);
      prefixval = prefixval.charAt(0).toUpperCase() + prefixval.substr(1);
      val = val.charAt(firstIndex).toUpperCase() + val.substr(firstIndex + 1);
      let firstVal = `${prefixval} ${val}`;

      const LastindexVal = firstVal.lastIndexOf(' ') + 1;
      let lastPrefix = firstVal.substring(0, LastindexVal - 1);
      // console.log(lastPrefix)
      lastPrefix = lastPrefix.charAt(0).toUpperCase() + lastPrefix.substr(1);
      firstVal =
        firstVal.charAt(LastindexVal).toUpperCase() +
        firstVal.substr(LastindexVal + 1);
      const lastVal = `${lastPrefix} ${firstVal}`;
      return lastVal;
    }
    // console.log('SpaceAfter')
    // console.log(val)
    const indexVal = val.lastIndexOf(' ') + 1;
    let prefix = val.substring(0, indexVal - 1);
    prefix = prefix.charAt(0).toUpperCase() + prefix.substr(1);
    // console.log(prefix)
    val = val.charAt(indexVal).toUpperCase() + val.substr(indexVal + 1);
    // console.log(val)
    const reVal = `${prefix} ${val}`;
    // console.log(reVal)
    return reVal;
  }

  hyphenRemoval(val: any) {
    const indexVal = val.lastIndexOf('-') + 1;
    let prefix = val.substring(0, indexVal - 1);
    prefix = prefix.charAt(0).toUpperCase() + prefix.substr(1);
    val = val.charAt(indexVal).toUpperCase() + val.substr(indexVal + 1);
    // console.log(val)
    const reVal = `${prefix} ${val}`;
    return reVal;
  }

  numOfSpaces(str: any) {
    // console.log(str)
    let letterCount = 0;
    for (let position = 0; position < str.length; position++) {
      if (str.charAt(position) == ' ') {
        letterCount += 1;
      }
    }
    return letterCount;
  }

  capFirstWord(val: any) {
    try {
      const newArr = [];
      val = val;
      if (val.includes(' ')) {
        const arr = val.split(' ');
        for (let i = 0; i < arr.length; i++) {
          newArr.push(this.FirstWord(arr[i]));
        }
        // console.log('CAPFIRST')
        // console.log(newArr)
        const word = newArr.join().replace(/,/g, ' ');
        return word;
      } else {
        const res = `${val.toLowerCase().charAt(0).toUpperCase()}${val.toLowerCase().replace(val.toLowerCase().charAt(0), '')}`;
        return res;
      }
    } catch {
      console.log('Cap First Word error');
    }
    return;
  }

  FirstWord(word: any) {
    let res = `${word.charAt(0).toUpperCase()}${word.substr(1)}`;
    // console.log(res)
    return res;
    // return `${word.toLowerCase().charAt(0).toUpperCase()}${word.toLowerCase().replace(word.toLowerCase().charAt(0), '')}`;
  }
  push(data: any) {
    console.log('98345345 :: ', data);

    $('#modalPush').modal('show');
    data.color = 'gold';
    data.timer = 120;
    data.isOpened = false;
    data.ETA = 'TBD';
    var tnum = data.restaurant.tNum;
    var res = tnum.split(' ');

    data.restaurant.tNum = res[1];
    this.data.unshift(data);

    this.orderCount = this.orderCount + 1;
    this.playAudio();

    // console.log("items" + this.data.items)

    //this.data=this.data[0];

    // this.data = this.data.reverse();
    for (var k = 0; k < this.data.length; k++) {
      if (this.data[k].timer != 0) {
        this.startTimer(this.data[k]);
      }
    }

    if (this.data.length == 0) {
      this.noOrders = true;
    } else {
      this.noOrders = false;
    }
  }
  pushStaticJson() {
    this.loading = true;
    this.service.getStaticData().subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        this.push(data);
      },
      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }
  startTimer(data: any) {
    var refreshIntervalId = setInterval(() => {
      if (data.timer > 0) {
        data.timer--;
        //console.log(data.timer);
      } else if (data.timer == 0) {
        this.redplay = this.redplay + 1;
        if (this.redplay == 1 && this.orderFlow == false) {
          this.sound.play();
        }
        for (var z = 0; z < this.data.length; z++) {
          if (this.data[z] == data) {
            this.data[z].color = 'red';
          }
        }
        if (this.orderDetail == data) {
          this.tempcolor = 'red';
        }
        // data.color = "red";
        clearInterval(refreshIntervalId);
      } else if (data.timer == -1) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);
  }

  playAudio() {
    if (this.orderCount === 1) {
      this.audio = new Audio('../../../assets/sounds/slow-spring-board.mp3');

      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.audio.play();
      });

      this.audio.play().catch((error: any) => {
        console.error('Audio playback failed:', error);
      });
    }
  }

  ngOnInit() {
    this.getInitValues();
  }
  formatPhoneNumber(phoneNumberString: any) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  getInitValues() {
    /* var d = new Date(),
           month = '' + (d.getMonth() + 1),
           day = '' + d.getDate(),
           year = d.getFullYear();
       
         if (month.length < 2) month = '0' + month;
         if (day.length < 2) day = '0' + day;
       
         var date = [year, month, day].join('-');*/
    this.loading = true;
    this.service.getInitalDetails(this.id).subscribe(
      (data) => {
        this.loading = false;
        this.resturantName = data.name;
        this.restStatus = data.pauseStatus;
        this.mainRestId = data.restId;
        this.storeDate = data.storeDate;
        if (data.deliveryEta == '0') {
          this.extendDelivery = 'default';
          this.extendDeliveryTemp = 'default';
        } else {
          this.extendDelivery = data.deliveryEta.substr(1);
          this.extendDeliveryTemp = this.extendDelivery;
        }
        if (data.pickupEta == '0') {
          this.extendPickup = 'default';
          this.extendPickupTemp = 'default';
        } else {
          this.extendPickup = data.pickupEta.substr(1);
          this.extendPickupTemp = this.extendPickup;
        }
        this.setETAS();
        //  modalConfirmDelete
        if (this.InitalPopcount == 0) {
          this.InitalPopcount = 1;
        }
        this.loading = true;
        this.service.getAllOrders(this.id, this.storeDate).subscribe(
          (data) => {
            this.loading = false;
            console.log(data);
            this.data = data;
            status = data.restStatus;
            console.log(this.storeDate);
            if (this.data.length == 0) {
              this.noOrders = true;
            } else {
              this.noOrders = false;
            }
            for (var i = 0; i < this.data.length; i++) {
              this.data[i].color = 'default';
              this.data[i].timer = 0;
              this.data[i].isOpened = true;
              this.data[i].customer.id = this.data[i].customer.id.slice(2, 12);
              //this.data[i].customer.id = this.formatPhoneNumber(this.data[i].customer.id);

              var tnum = this.data[i].restaurant.tNum;
              var res = tnum.split(' ');
              this.data[i].restaurant.tNum = res[1];
            }

            for (var k = 0; k < this.data.length; k++) {
              if (data[k].orderStatus.refundStatus == true) {
                //do nothing
                //  this.data[k].color = 'grey';
                data[k].orderStatus.ETA = 'REFUND';
              }
              if (this.data[k].orderStatus.ETA == 'TBD') {
                if (data[k].orderStatus.refundStatus == true) {
                  //do nothing
                  //  this.data[k].color = 'grey';
                  data[k].orderStatus.ETA = 'REFUND';
                } else {
                  this.data[k].timer = 120;
                  this.data[k].color = 'gold';
                  this.startTimer(this.data[k]);
                }
              }
              if (data[k].orderStatus.refundStatus == true) {
                //do nothing
                this.data[k].color = 'refunded';
              }
            }
            //this.pushStaticJson();
            console.log(this.data);
            console.log(this.restStatus);
          },
          (error) => {
            this.loading = false;
            console.log(error);
          },
        );
      },

      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }
  resetETA() {
    var flag;
    if (this.extendPickup == 'default' && this.extendDelivery == 'default') {
      flag = false;
    } else {
      flag = true;
    }
    var pickup = this.extendPickupTemp;
    var delivery = this.extendDeliveryTemp;
    if (pickup == 'default') {
      pickup = '0';
    } else {
      pickup = '+' + pickup;
    }
    if (delivery == 'default') {
      delivery = '0';
    } else {
      delivery = '+' + delivery;
    }
    var id = '+1' + this.id;
    this.service.resetETA(id, flag, pickup, delivery).subscribe(
      (data) => {
        this.loading = false;
        if (data.status == 200) {
          $('#extendeta').modal('hide');
          $('#etaupdatesucess').modal('show');
          this.extendDelivery = this.extendDeliveryTemp;
          this.extendPickup = this.extendPickupTemp;
          this.setETAS();
          console.log('lol');
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }
  setETAS() {
    if (this.extendDelivery == 'default') {
      (this.eta.delivery.timeslot1 = '20-25'),
        (this.eta.delivery.timeslot2 = '30-45'),
        (this.eta.delivery.timeslot3 = '60+');
    }
    if (this.extendDelivery == '10') {
      (this.eta.delivery.timeslot1 = '30-35'),
        (this.eta.delivery.timeslot2 = '40-55'),
        (this.eta.delivery.timeslot3 = '70+');
    }
    if (this.extendDelivery == '20') {
      (this.eta.delivery.timeslot1 = '40-45'),
        (this.eta.delivery.timeslot2 = '50-65'),
        (this.eta.delivery.timeslot3 = '80+');
    }
    if (this.extendDelivery == '30') {
      (this.eta.delivery.timeslot1 = '50-55'),
        (this.eta.delivery.timeslot2 = '60-75'),
        (this.eta.delivery.timeslot3 = '90+');
    }
    if (this.extendPickup == 'default') {
      (this.eta.pickup.timeslot1 = '10-15'),
        (this.eta.pickup.timeslot2 = '15-20'),
        (this.eta.pickup.timeslot3 = '20-25');
    }
    if (this.extendPickup == '10') {
      (this.eta.pickup.timeslot1 = '20-25'),
        (this.eta.pickup.timeslot2 = '25-30'),
        (this.eta.pickup.timeslot3 = '30-35');
    }
    if (this.extendPickup == '20') {
      (this.eta.pickup.timeslot1 = '30-35'),
        (this.eta.pickup.timeslot2 = '35-40'),
        (this.eta.pickup.timeslot3 = '40-45');
    }
    if (this.extendPickup == '30') {
      (this.eta.pickup.timeslot1 = '40-45'),
        (this.eta.pickup.timeslot2 = '45-50'),
        (this.eta.pickup.timeslot3 = '50-55');
    }
  }

  extendETA(ETA: any, TYPE: any) {
    console.log(this.eta);
    if (ETA == 'default') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = 'default';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = 'default';
      }
    }
    if (ETA == '10') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = '10';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '10';
      }
    }
    if (ETA == '20') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = '20';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '20';
      }
    }
    if (ETA == '30') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = '30';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '30';
      }
    }
    console.log(this.eta);
  }

  PausePlayModal() {
    console.log(this.restStatus);
    $('#modalPoll-1').modal('hide');

    if (this.restStatus == true) {
      $('#modalConfirmDelete').modal('show');
    }
    if (this.restStatus == false) {
      $('#modalConfirmSuccess').modal('show');
    }
  }

  click() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.orderCount = 0;
  }

  acceptOrder($event: any) {
    if (this.customtime != undefined || this.customtime != null) {
      var eta = this.customtime;
      var orderid = $event.id;
    } else {
      var orderid = $event.id;
      var eta = $event.eta;

      if (eta.toString().indexOf('-') == -1) {
        this.customTimeFlag = true;
      } else {
        this.customTimeFlag = false;
      }
    }
    console.log(orderid);
    console.log(eta);
    if (eta == 'TBD') {
    } else {
      this.loading = true;
      this.service.acceptOrders(orderid, eta, this.customTimeFlag).subscribe(
        (data) => {
          this.loading = false;
          if (data.status == 200) {
            this.orderDetail.orderStatus.ETA = this.tempETA;
            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i] == this.orderDetail) {
                this.data[i].ETA = this.orderDetail.orderStatus.ETA;
                this.tempcolor = 'default';
                this.data[i].color = 'default';
                this.data[i].timer = -1;
              }
            }
            var data1 = this.data.filter((data: any) => data.color == 'red');

            if (data1.length == 0) {
              this.sound.stop();
            } else {
              this.sound.play();
            }
            this.orderFlow = false;
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        },
      );
    }
  }
  pauseresume() {
    console.log();
    //this.pause = !this.pause;
    if (this.pause) {
      this.state = 'running';
      this.datas = {
        restId: parseInt(this.id),
        restStatus: 'running',
      };
    } else {
      this.datas = {
        restId: parseInt(this.id),
        restStatus: 'paused',
      };
    }
    //this.pauses(this.datas);
  }
  storeReport() {
    $('#storeReport').modal('show');
    $('#modalPoll-1').modal('hide');
    this.smallload = true;
    this.service.storeReport(this.id, this.storeDate).subscribe(
      (data) => {
        console.log(data);
        this.storemetrics = data;
        this.smallload = false;
      },

      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }
  setETA($event: any) {
    /* if (!($event.includes("-"))) {
             this.customnFlag = true;
             this.customtime = $event;
             this.tempETA = $event;
         }
         else {
             if ($event == 'Custom') {
                 this.customnFlag = true;
                 this.tempETA = $event;
                 //this.orderDetail.orderStatus.ETA = this.customTime;
             }
             else {
 
                 this.tempETA = $event;
                 this.customnFlag = false;
 
 
             }
             for (var i = 0; i < this.data.length; i++) {
                 if (this.data[i] == this.orderDetail) {
                     this.data[i].ETA = this.orderDetail.orderStatus.ETA;
                 }
             }
             console.log(this.data);
             ///*/
    console.log($event);
    this.customnFlag = false;
    this.tempETA = $event;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i] == this.orderDetail) {
        this.data[i].ETA = this.orderDetail.orderStatus.ETA;
      }
    }
    console.log(this.data);
  }
  confirm($event: any) {
    this.tempETA = $event;
    //alert(this.tempETA);
  }
  amountValidation() {
    var amount = parseFloat(this.partialRefundAmount);
    var fullamount = parseFloat(this.orderDetail.paidDollarValue.paidTotal);
    if (amount > fullamount) {
      return true;
    } else {
      return false;
    }
  }
  openOrder($event: any) {
    this.customnFlag = false;
    var order = $event.ordernumber;
    var orderD = $event.order;
    var data1 = this.data.filter((data: any) => data.color == 'red');

    if (data1.length != 0) {
      this.sound.stop();
    }

    //console.log(i)
    console.log('on open order');
    console.log(orderD);

    if (this.orderDetail.length != 0) {
      for (var l = 0; l < this.data.length; l++) {
        if (this.data[l].restaurant.tNum == this.orderDetail.restaurant.tNum) {
          this.data[l].color = this.tempcolor;
        }
      }
    }
    this.tempcolor = orderD.color;
    this.tempETA = '';
    this.splitdata = true;
    this.orderDetail = orderD;
    var cleaned = ('' + this.orderDetail.customer.id).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      this.orderDetail.customer.id = [
        intlCode,
        '(',
        match[2],
        ') ',
        match[3],
        '-',
        match[4],
      ].join('');
    }

    this.qty = [];
    this.items = [];
    this.toppings = [];
    this.amounts = [];
    this.itemNames = [];
    this.sizes = [];
    this.cursts = [];
    this.firstHalf = [];
    this.secondHalf = [];
    this.bake = [];
    this.crustTopper = [];
    this.sauce = [];
    this.sides = [];
    this.dressing = [];
    this.seasoning = [];
    this.drizzle = [];
    this.bread = [];
    this.cheese = [];
    this.sauceBase = [];
    this.dipping = [];
    this.cut = [];
    this.wingType = [];
    this.seasoningPackets = [];
    this.notApplicable = [];
    this.orderFlow = true;

    this.couponName = this.orderDetail.paidDollarValue.couponName;
    this.itemsTotal = this.orderDetail.paidDollarValue.itemsTotal;
    this.saving = this.orderDetail.paidDollarValue.savings;
    this.subtotal = this.orderDetail.paidDollarValue.subtotal;
    this.delivery_fee = this.orderDetail.paidDollarValue.delivery_fee;
    this.tax = this.orderDetail.paidDollarValue.tax;
    this.total = parseFloat(this.orderDetail.paidDollarValue.total);
    this.orderDetail.items.map((x: any, index: any) => {
      this.items.push(index);
      this.toppings.push(this.replaceUndefined(x.item.Toppings));
      this.qty.push(x.item.quantity);
      this.amounts.push(x.item.price);
      this.itemNames.push(this.replaceUndefined(x.item.name));
      this.sizes.push(this.replaceUndefined(x.item.Size));
      this.cursts.push(this.replaceUndefined(x.item.Crust));
      this.firstHalf.push(this.replaceUndefined(x.item.First_Half));
      this.secondHalf.push(this.replaceUndefined(x.item.Second_Half));
      this.bake.push(this.replaceUndefined(x.item.Bake));
      this.dressing.push(this.replaceUndefined(x.item.Dressing));
      this.drizzle.push(this.replaceUndefined(x.item.Drizzle));
      this.bread.push(this.replaceUndefined(x.item.Bread));
      this.cheese.push(this.replaceUndefined(x.item.Cheese));
      this.seasoning.push(this.replaceUndefined(x.item.Seasoning));
      this.crustTopper.push(this.replaceUndefined(x.item.Crust_topper));
      this.sauceBase.push(this.replaceUndefined(x.item.Base));
      this.cut.push(this.replaceUndefined(x.item.Cut));
      this.dipping.push(this.replaceUndefined(x.item.Dipping));
      this.seasoningPackets.push(
        this.replaceUndefined(x.item['Seasoning packets']),
      );
      this.sauce.push(this.replaceUndefined(x.item.Sauce));
      this.wingType.push(this.replaceUndefined(x.item.Wingtype));
      this.sides.push(this.replaceUndefined(x.item.Sides));
      this.notApplicable.push(this.replaceUndefined(x.item.itemNA));
    });
    console.log(this.orderDetail);
    console.log('ORDER INFO');
    this.isPaid = this.orderDetail.orderStatus.isPaid;
    console.log(this.isPaid);
    console.log(typeof this.isPaid);
    for (var z = 0; z < this.data.length; z++) {
      if (this.data[z] == this.orderDetail) {
        this.data[z].color = 'black-bg white-c';
      }
    }

    // this.orderDetail.color = 'black-bg white-c';
    // console.log(this.toppings);

    console.log(this.data);
  }

  back() {
    this.orderFlow = false;
    console.log(this.data);
  }
  closebutton() {
    var data1 = this.data.filter((data: any) => data.color == 'red');

    if (data1.length != 0) {
      this.sound.play();
    }
    for (var l = 0; l < this.data.length; l++) {
      if (this.data[l].restaurant.tNum == this.orderDetail.restaurant.tNum) {
        this.data[l].color = this.tempcolor;
      }
    }

    this.orderFlow = false;
  }
  extendETAPopup() {
    // this.extendETAPopups.emit();
    this.extendeta = true;
    $('#pin-modal').modal('show');
    $('#modalPoll-1').modal('hide');
    //$('#extendeta').modal('show');
  }
  extendPin() {
    this.storePinlengthMessage = false;
    this.loading = true;
    this.service.checkPin(this.mainRestId, this.storePIN).subscribe(
      (data) => {
        this.loading = false;
        if (data.pinStatus == true) {
          this.pinAttempt = 0;
          $('#pin-modal').modal('hide');

          $('#extendeta').modal('show');
        } else {
          this.pinAttempt = this.pinAttempt + 1;
          if (this.pinAttempt > 3) {
          }
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      },
    );
  }
  pauses() {
    this.extendeta = false;
    $('#modalPoll-1').modal('hide');

    $('#pin-modal').on('shown.bs.modal', function () {
      $('#storepinn').focus();
    });

    if (!this.storePinDisplay) {
      this.storePinDisplay = true;
      $('#pin-modal').modal('show');
      $('#pin-modal').on('shown.bs.modal', function () {
        $('#storepinn').focus();
      });
    } else {
      if (this.storePIN.toString().length != 4) {
        this.storePinlengthMessage = true;
      } else {
        this.storePinlengthMessage = false;
        this.loading = true;
        this.service.checkPin(this.mainRestId, this.storePIN).subscribe(
          (data) => {
            this.loading = false;
            if (data.pinStatus == true) {
              this.pinAttempt = 0;
              this.service.pauseOrders(this.id).subscribe(
                (data) => {
                  this.loading = false;
                  if (data.status == 200) {
                    $('#pin-modal').modal('hide');
                    //this.getInitValues();
                    this.PausePlayModal();
                    this.service.getInitalDetails(this.id).subscribe(
                      (data) => {
                        this.loading = false;
                        this.resturantName = data.name;
                        this.restStatus = data.pauseStatus;
                        this.mainRestId = data.restId;
                        this.storeDate = data.storeDate;
                        //  modalConfirmDelete
                        if (this.InitalPopcount == 0) {
                          this.InitalPopcount = 1;
                        }
                      },

                      (error) => {
                        this.loading = false;
                        console.log(error);
                      },
                    );
                  }
                },
                (error) => {
                  this.loading = false;
                  console.log(error);
                },
              );
            } else {
              this.pinAttempt = this.pinAttempt + 1;
              if (this.pinAttempt > 3) {
              }
            }
          },
          (error) => {
            this.loading = false;
            console.log(error);
          },
        );
      }
    }
  }
}
