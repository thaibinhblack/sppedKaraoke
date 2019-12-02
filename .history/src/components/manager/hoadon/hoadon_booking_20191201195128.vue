<template>
<div class="invoice-box">
  <table cellpadding="0" cellspacing="0">
    <tr class="top">
      <td colspan="4">
        <table>
          <tr>
            <td class="title">
              <img :src="$store.state.PUBLIC_URL + bill.LOGO_BAR_KARAOKE" style="width:100%; max-width:300px;">
            </td>

            <td>
              {{bill.CREATED_AT}}<br>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="information">
      <td colspan="4">
        <table>
          <tr>
            <td>
                {{bill.NAME_BAR_KARAOKE}}<br> 
                {{bill.ADDRESS_BAR_KARAOKE}}<br>
                
            </td>

            <td>
              {{bill.PHONE_BAR_KARAOKE}}<br> 
              {{bill.EMAIL_BAR_KARAOKE}}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="heading">
      <td colspan="3">Thông tin hóa đơn</td>
      <td>#<td>
    </tr>
    <tr>
      <td colspan="3">Thời gian đặt phòng </td>
      <td>{{bill.DATE_BOOK}}, {{bill.TIME_START}} </td>
    </tr>
    <tr class="time_end">
      <td colspan="3">Thời gian thanh toán</td>
      <td>{{bill.UPDATED_AT}}, {{bill.TIME_END}}</td>
    </tr>
    <tr class="money">
      <td colspan="3">
        Giá
      </td>
      <td>{{bill.RENT_COST}} vnđ/h</td>
    </tr>
    <tr class="code">
      <td colspan="3">
        Mã khuyến mãi
      </td>
      <td>{{bill.CODE_PROMOTION}}</td>
    </tr>
     <tr class="paypal">
      <td colspan="3">
        Hình thức thanh toán
      </td>
      <td>{{bill.PAYPAL == 1? 'Thanh toán trực tiếp': 'Thanh toán bằng SPEED COIN'}}</td>
    </tr>

     <tr class="totl_time">
      <td colspan="3">
        Tổng thời gian
      </td>
      <td>{{bill.TOTAL_TIME}}</td>
    </tr>

     <tr class="money">
      <td colspan="3">
        Thành tiền
      </td>
      <td>{{bill.PRICE_BILL}}</td>
    </tr>

  </table>
</div>
</template>

<script>
export default {
    props: ["bill"]
}
</script>

<style scoped>

.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}

</style>