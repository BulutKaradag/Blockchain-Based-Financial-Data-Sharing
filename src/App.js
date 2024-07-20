import React from "react";
import web3 from "./web3";
import fds from "./fds";

class App extends React.Component {
  
  state = {
    message:"",
    rawData : [] ,
    value: "",
    _taxnumber:"",
    _corporationname:"",
    _productname:"",
    _productlimit:"",
    _collaretalname:"",
    _collaretallimit:"",
    _risk:"",
  }
  ;

  async componentDidMount() {
  
  }

  onSubmit = async (event) => {
    event.preventDefault();
try{
    const rawData = await fds.methods.getCorporationInfoByTaxNumber(this.state.value).call();
    if (rawData === null) {
      this.setState({ message: "Kayıt Bulunamadı!" });
    } else {
      this.setState({rawData});
      this.setState({ message: "Blockchain Ağından Veri Getirildi!" });
    }
  } catch (error) {
    console.error("An error occurred while fetching data from the smart contract:", error);
  }  
  };

  onClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "İşlem Devam Ediyor..." });

    await fds.methods.register(this.state._taxnumber, this.state._corporationname, this.state._productname, this.state._productlimit, this.state._collaretalname, this.state._collaretallimit, this.state._risk)
    .send({gas:'3000000', from: accounts[0]})
    .on('transactionHash', (hash) => {
      console.log('Transaction hash:', hash);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });

    this.setState({ message: "Veri blockchain ağına eklendi!" });
  };

  render() {
    return (
      
      <div class="container">
        <hr />
        <form onSubmit={this.onSubmit}>
          <h2>Blockchain Ağından Sorgulama Yapmak İstediğiniz TC Kimlik Numarasını Giriniz</h2>
          <div class="form">
          <div>
            <label>TC Kimlik: </label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div> 
          <button type="submit">Blockchain Ağından Getir</button>
          </div>
        </form>

        <hr />
        <h2>Sorgu Sonucu</h2>
        <p>
          Bu müşteriye ait Finansal Bilgiler şu şekildedir; 

          <p><strong>TC Kimlik:</strong> {String(this.state.value)} |  <strong>Banka:</strong> {this.state.rawData[0] && this.state.rawData[0].join(", ")} | <strong>Ürün:</strong> {this.state.rawData[1] && this.state.rawData[1].join(", ")} | 
          <strong>Ürün Limiti:</strong> {String(this.state.rawData[2])} |  <strong>Teminat Adı:</strong> {this.state.rawData[3] && this.state.rawData[3].join(", ")}
          | <strong>Teminat Limiti:</strong> {String(this.state.rawData[4])} | <strong>Müşteri Riski:</strong>{String(this.state.rawData[5])}  </p>
        </p>
        <hr />
        <div class="form">
        <form onSubmit={this.onClick}>
          <h2>Müşteri Finansal Bilgilerini Blockchain Ağına Gönder</h2>
          <div>
            <input placeholder="TC Kimlik No"
              _taxnumber={this.state._taxnumber}
              onChange={(event) => this.setState({ _taxnumber: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Banka"
              _corporationname={this.state._corporationname}
              onChange={(event) => this.setState({ _corporationname: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Ürün"
              _productname={this.state._productname}
              onChange={(event) => this.setState({ _productname: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Ürün Limiti"
              _productlimit={this.state._productlimit}
              onChange={(event) => this.setState({ _productlimit: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Teminat Adı"
              _collaretalname={this.state._collaretalname}
              onChange={(event) => this.setState({ _collaretalname: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Teminat Limiti"
              _collaretallimit={this.state._collaretallimit}
              onChange={(event) => this.setState({ _collaretallimit: event.target.value })}
            />
          </div>
          <div>
            <input placeholder="Müşteri Riski"
              _risk={this.state._risk}
              onChange={(event) => this.setState({ _risk: event.target.value })}
            />
          </div> 
          <br></br>
          <button type="submit">Blockchain Ağına Ekle</button>
        </form>
        </div>
        <hr />

      <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
