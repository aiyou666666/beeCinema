<template>
<div class="service-system">
    <h2>JUMORE Service</h2>
    <div class="avg">
        <div class="avginner">
            <div class="ob" onclick="window.open('http://jumorefinance.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Finance</h2>
                    <p>Professional Capital</p>
                    <p>Management and</p>
                    <p>Financial Services</p>
                </div>
            </div>
            <div class="ob" onclick="window.open('http://etransmore.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Logistics</h2>
                    <p>Lean Distribution</p>
                    <p>Serivce at</p>
                    <p>Competitive Rates</p>
                </div>
            </div>
            <div class="ob" onclick="window.open('http://jumoredata.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Big Data</h2>
                    <p>Big Data Solution</p>
                    <p>to Facilitate</p>
                    <p>Decision-Making</p>
                </div>
            </div>
            <div class="ob" onclick="window.open('http://jumoretech.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Technology</h2>
                    <p>Intelligent Solutions</p>
                    <p>for Whole</p>
                    <p>Manufacturing Chain</p>
                </div>
            </div>
            <div class="ob" onclick="window.open('http://jumoreconsultancy.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Consultancy</h2>
                    <p>Scientific Consulting</p>
                    <p>Service in</p>
                    <p>Business Management</p>
                </div>
            </div>
            <div class="ob" onclick="window.open('http://jumorecertification.com')">
                <div class="overbox1"></div>
                <div class="overbox2">
                    <h2>Certification</h2>
                    <p>Customized Certification </p>
                    <p>for Global</p>
                    <p>Trade</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" type="text/scss">
.service-system{
    margin-bottom: 50px;
    h2{
        height: 56px;
        line-height: 56px;
        font: 700 16px/70px Arial;
    }
    .avg{
        height: 300px;
        background-color: #f6f6f6;
        border: 1px solid #e5e5e5;
        .avginner{
            padding: 30px 0 30px 25px;
            .ob{
                background-color: #f6f6f6;
                width: 189px;
                height: 240px;
                float: left;
                cursor: pointer;
                .overbox1{
                    background: url('~assets/img/service/jm-service.png') no-repeat;
                    width: 52px;
                    height: 52px;
                    background-position: 0 -472px;
                    margin: 0 auto;
                    margin-top: 35px;
                    cursor: pointer;
                }
                &:hover{
                    background-color: #fff;
                    color: #2788e8;
                }
                &:nth-of-type(1):hover .overbox1{
                    background-position: 0 -524px;
                }
                &:nth-of-type(2):hover .overbox1{
                    background-position: 0 -290px;
                }
                &:nth-of-type(3):hover .overbox1{
                    background-position: 0 -198px;
                }
                &:nth-of-type(4):hover .overbox1{
                    background-position: 0 -372px;
                }
                &:nth-of-type(5):hover .overbox1{
                    background-position: 0 0;
                }
                &:nth-of-type(6):hover .overbox1{
                    background-position: 0 -94px;
                }
                &:nth-of-type(2) .overbox1{
                    height: 41px;
                    margin-top: 45px;
                    background-position: 0 -331px;
                }
                &:nth-of-type(3) .overbox1{
                    width: 47px;
                    height: 46px;
                    margin-top: 41px;
                    background-position: 0 -244px;
                    
                }
                &:nth-of-type(4) .overbox1{
                    height: 50px;
                    margin-top: 41px;
                    background-position: 0 -422px;
                    
                }
                &:nth-of-type(5) .overbox1{
                    width: 41px;
                    height: 47px;
                    margin-top: 44px;
                    background-position: 0 -47px;
                    
                }
                &:nth-of-type(6) .overbox1{
                    width: 44px;
                    margin-top: 43px;
                    background-position: 0 -146px;
                    
                }
            }
            
            .overbox2{
                text-align: center;
                h2{
                    height: 20px;
                    font-size: 18px;
                    line-height: 20px;
                    margin-top: 35px;
                    margin-bottom: 20px;
                }
                p{
                    line-height: 18px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
