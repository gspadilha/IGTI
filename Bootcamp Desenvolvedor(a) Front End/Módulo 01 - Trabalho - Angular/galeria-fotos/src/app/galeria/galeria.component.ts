import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
})
export class GaleriaComponent implements OnInit {
  @Input() id: number = 0;
  @Input() titulo: string = 'Fotos';
  @Input() foto: string = '';
  @Input() fotos: string[] = [
    'https://marquesfernandes.com/wp-content/uploads/2020/03/alexander-popov-iQqqo2zpmTI-unsplash-scaled.jpg',
    'https://i2.wp.com/marketingcomcafe.com.br/wp-content/uploads/2017/12/banco-imagens-gratis.png',
    'https://s2.glbimg.com/nksCDlmBan7iiSCgJqZdN7A5ekc=/e.glbimg.com/og/ed/f/original/2019/10/22/6th-place_small-white-hair-spider_javier-ruperez_nikon-small-world.jpg',
  ];

  constructor() {
    this.foto = this.fotos[this.id];
  }

  ngOnInit(): void {}

  setValue(id: number) {
    if (id >= 0 && id < this.fotos.length) {
      this.foto = this.fotos[id];
      this.id = id;
    }
  }
}
