import { Component, OnInit } from '@angular/core';
import { McuService } from '../../services/mcu.service';
import { Mcu } from '../../models/mcu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public mcu: any = '';
  public labelIntruso: any = 'No hay intrusos';
  public imgSrcIntruso: any = 'assets/images/robber.svg';
  public animacionAlerta: any = '';
  public labelIncendio: any = '';
  public animacionAlertaIncendio: any = '';
  public imgSrcIncendio: any = '';
  public mostrarAlertaIntruso: any = 0;
  public mostrarAlertaIncendio: any = 0;


  constructor(
    public mcuService: McuService,
  ) {
  }

  ngOnInit(): void {
    this.getElementsMcu();
  }

  async getElementsMcu() {

    this.mcuService.getElementsMcu().subscribe(data => {

      this.mcu = '';


      data.forEach(element => {

        if (element.key === 'buzzer' && element.value !== '1') {
        } else if (element.key === 'temperature' && Number(element.value) > 33) {
          this.onClickEncenderVentilador();
        } else if (element.key === 'pir' && Number(element.value) === 1) {
          this.labelIntruso = 'Hay un intruso!';
          this.imgSrcIntruso = 'assets/images/robberon.svg';
          this.animacionAlerta = 'corazon';
          if (this.mostrarAlertaIntruso !== 1) {
            this.mostrarAlertaIntruso = 1;
            Swal.fire({
              title: 'Hay un intruso!',
              html: '<h5> ¿Te gustaría encender la alarma?</h5>',
              icon: 'warning',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Si, encender! 😱',
              cancelButtonText: 'No, todo tranqui! 😎'
            }).then((result) => {
              if (result.isConfirmed) {
                this.onClickEncenderAlarma();
              } else {
                Swal.close();
              }
            });
          }

        } else if (element.key === 'pir' && Number(element.value) === 0) {
          this.labelIntruso = 'No hay intrusos';
          this.imgSrcIntruso = 'assets/images/robber.svg';
          this.animacionAlerta = '';
          this.mostrarAlertaIntruso = 0;
        } else if (element.key === 'gas' && Number(element.value) >= 15) {
          this.labelIncendio = 'Hay un incendio!';
          this.imgSrcIncendio = 'assets/images/fireon.svg';
          this.animacionAlertaIncendio = 'corazon';

          if (this.mostrarAlertaIncendio !== 1) {
            this.mostrarAlertaIncendio = 1;
            Swal.fire({
              title: 'Hay un posible incendio!',
              html: '<h5> ¿Te gustaría encender los ventiladores ?</h5>',
              icon: 'warning',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Si, encender! 😱',
              cancelButtonText: 'No, todo tranqui! 😎'
            }).then((result) => {
              if (result.isConfirmed) {
                this.onClickEncenderVentilador();
              } else {
                Swal.close();
              }
            });
          }


        } else if (element.key === 'gas' && Number(element.value) < 15) {
          this.labelIncendio = 'No hay incendios';
          this.imgSrcIncendio = 'assets/images/fireoff.svg';
          this.animacionAlertaIncendio = '';
          this.mostrarAlertaIncendio = 0;
        }

        this.mcu += `<b>• ${element.key}:</b> ${element.value} <br/>`;
      });

      const bodyDataFire = document.getElementById('bodyDataFire');
      if (bodyDataFire) { bodyDataFire.innerHTML = ''; }
      if (bodyDataFire) { bodyDataFire.innerHTML = this.mcu };
    });
  }



  onClickEncenderVentilador() {

    this.generarAlertGestion('success', 'Ventilador encendido');
    this.mcuService.PowerOnFan();
  }

  onClickApagarVentilador() {

    this.generarAlertGestion('info', 'Ventilador apagado');
    this.mcuService.PowerOffFan();
  }

  onClickEncenderBombillo() {

    this.generarAlertGestion('success', 'Led encendido');
    this.mcuService.PowerOnLedNode();

  }

  onClickApagarBombillo() {

    this.generarAlertGestion('info', 'led apagado');
    this.mcuService.PowerOffLedNode();

  }

  onClickEncenderAlarma() {

    this.generarAlertGestion('success', 'Alarma Encendida');
    this.mcuService.PowerOnBuzzer();

  }


  generarAlertGestion(icono: any, titulo: any) {

    Swal.fire({
      title: titulo,
      icon: icono,
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: 'Ok!'
    });

  }



}
