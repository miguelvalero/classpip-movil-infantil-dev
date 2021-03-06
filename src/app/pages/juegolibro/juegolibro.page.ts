import { Component, OnInit } from '@angular/core';
import { PeticionesapiService } from '../../services/peticionesapi.service';
import { DataService } from '../../services/data.service';
import { juegolibro } from 'src/app/models/juegolibro';
import { Alumno } from 'src/app/models/alumno';
import { Concurso } from 'src/app/models/concurso';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';
import { Libro } from 'src/app/models/libro';
import { element } from 'protractor';

@Component({
  selector: 'app-juegolibro',
  templateUrl: './juegolibro.page.html',
  styleUrls: ['./juegolibro.page.scss'],
})
export class JuegolibroPage implements OnInit {


  
  constructor(private router: Router, private peticionesAPI: PeticionesapiService, public alertController: AlertController, private dataService: DataService)  { }
  id;
  idg;
  nivel1: any = '';
  nivel2: any = '';
  nivel3: any = '';
  idconcurso;
  NombreJuego: any = '';
  grupoId: any = '';
  listaparticipantes: Alumno[];
  concurso;
  concursoRequisitos;
  concursoPrimerCriterio;
  concursoSegundoCriterio;
  concursoTematica;
  concursoTercerCriterio;
  dateFinInscripcion;
  dateFinVotacion;
  acabado;
  muestrame = false;
  muestraer = false;
  juegodelibro: juegolibro;
  listalibros;
  date;
  diafrontera = false;
  aunhaytiempo = false;
  muestraresul = false;
  idalumno;
  idalumnojuegodelibro;
  descripcion;
  listainscripcipnes = [];
  juegoAlumnoLibro: any;
  juegoAlumnoLibroElegido: any;
  criterioprivilegio1: any = '';
  criterioprivilegio2: any = '';
  criterioprivilegio3: any = '';
  muestracriterio3 = false;
  muestracriterio2 = false;
  muestracriterio1 = false;
  libroalumno: Libro;
  hayLibro: any = false;
  idLibro: any;
  concu;
  hayLibroFinalizado: any = false;

  permisoVer: any = false;
  ngOnInit() {

    this.obtenerlibro();
    this.obtenerparticipantes();
    this.obtenerconcurso();
    this.muestraer = false;
    this.obtenerJuegoAlumnoLibro();



  }

  public obtenerlibro() {
    this.id = localStorage.getItem("idjuegolibro");

    this.peticionesAPI.getjuedolibro(this.id)
      .subscribe((res) => {
        console.log(res);
        this.juegodelibro = res;
        this.NombreJuego = res.NombreJuego;
        this.grupoId = res.grupoId;
        this.descripcion = res.descripcion;
        this.criterioprivilegio1 = res.criterioprivilegio1;
        this.criterioprivilegio2 = res.criterioprivilegio2;
        this.criterioprivilegio3 = res.criterioprivilegio3;


      }, (err) => {
        console.log(err);
      })





  }



  obtenerJuegoAlumnoLibro() {

    this.id = localStorage.getItem("idjuegolibro");

    this.idalumno = localStorage.getItem("idAlumno");

    this.peticionesAPI.obtenerAlumnosJuegoLibro(this.id)
      .subscribe((res) => {
        res.forEach(element => {
          if (element.alumnoID == this.idalumno) {

            localStorage.setItem('idalumnojuego', element.id)
            this.idalumnojuegodelibro = element.id;
            this.nivel1 = element.nivel1;
            this.nivel2 = element.nivel2;
            this.nivel3 = element.nivel3;
            this.permisoVer = element.permisoparaver;
            this.anunciarcriteriosprivilgios();
            this.getLibro()
          }
        });
      }, (err) => {

      })

  }

  getLibro() {


    this.peticionesAPI.getLibroAlumnoJuego(this.idalumnojuegodelibro)
      .subscribe((res) => {
        if (res.length == 0) {
          this.hayLibro = false;
        }

        else if (res.length != 0) {
          this.hayLibro = true;
          this.idLibro = res[0].id;
          this.libroalumno = res[0];
          this.hayLibroFinalizado = res[0].finalizado;
          localStorage.setItem("idLibro", this.idLibro);
          localStorage.setItem("contenedor",res[0].titulo)

        }
      }, (err) => {

      })
  }

  anunciarcriteriosprivilgios() {

    if (this.nivel1 == false)
      this.muestracriterio1 = true;
    if (this.nivel2 == false)
      this.muestracriterio2 = true;
    if (this.nivel3 == false)
      this.muestracriterio3 = true;


  }


  obtenerLibroAlumnoJuego() {


    this.peticionesAPI.getLibroAlumnoJuego(this.idalumnojuegodelibro)


      .subscribe((res) => {


      }, (err) => {
        console.log(err);
      })



  }



  public obtenerparticipantes() {
    this.idg = localStorage.getItem("idgrupo");

    this.peticionesAPI.getalumnosgrupo(this.idg)


      .subscribe((res) => {
        this.listaparticipantes = [];
        console.log(res);
        this.listaparticipantes = res;
        console.log(this.listaparticipantes);



      }, (err) => {
        console.log(err);
      })

  }


  public obtenerconcurso() {
    this.id = localStorage.getItem("idjuegolibro");

    this.peticionesAPI.getconcurso(this.id)

      .subscribe((res) => {
        var data;

        this.concurso = res;
        console.log(res);
        console.log(res);


        this.concurso.forEach(cosa => {
          this.idconcurso = cosa.id;
          this.concursoPrimerCriterio = cosa.concursoPrimerCriterio;
          this.concursoRequisitos = cosa.concursoRequisitos;
          this.concursoSegundoCriterio = cosa.concursoSegundoCriterio;
          this.concursoTercerCriterio = cosa.concursoTercerCriterio;
          this.dateFinVotacion = cosa.dateFinVotacion;
          this.dateFinVotacion = this.dateFinVotacion.toString().split('T');
          this.dateFinVotacion = this.dateFinVotacion[0];
          this.dateFinInscripcion = cosa.dateFinInscripcion;
          this.dateFinInscripcion = this.dateFinInscripcion.toString().split('T');
          this.dateFinInscripcion = this.dateFinInscripcion[0];
          this.concursoTematica = cosa.concursoTematica;
          this.listainscripcipnes = cosa.listaLibrosParticipantes;
          this.acabado = cosa.acabado;
          this.concu = cosa;


          this.dataService.setdataconcurso(this.concu);
          this.muestra();
          // this.estaacabado();
          this.obtenerfecha();
        })
      }, (err) => {
        this.muestraerror();

      })

  }

  // estaacabado() {
  //   if (this.acabado = true)
  //     this.muestraresul = true;

  // }
  public muestra() {
    this.muestrame = true;


  }

  public muestraerror() {

    this.muestraer = true;

  }


  public inscribirlibro() {



    var encontrado = "false";
    if (this.hayLibro == true) {

      if (this.libroalumno.finalizado == true) {

        this.listainscripcipnes.forEach(element => {
          if (element == this.libroalumno.id) {
            encontrado = "true";
          }
        })

        if (encontrado == "false") {

          this.listainscripcipnes.push(this.libroalumno.id);

          this.alertinscribir();

          this.peticionesAPI.putConcurso(this.idconcurso, this.concu)

            .subscribe((res) => {


            }, (err) => {

              console.log(err);

            })

        }
      }


      if (this.libroalumno.finalizado == false) {

        this.alertnoestafinalizado();
      }


    }
    if (this.hayLibro == false) {

      this.alertcrealibro();
    }


  }



  async alertinscribir() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'INSCRIBIR CUENTO',
      subHeader: '¿Estas seguro de querer inscribir tu cuento?',
      message: ' Una vez inscrito no podras modificarlo.',
      buttons: ['Aceptar', 'Cancelar']
    });

    await alert.present();
  }

  async alertnoestafinalizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inscipción no realizada',
      subHeader: 'Cuento no finalizado',
      message: 'Por favor acaba el cuento antes de participar en el concurso',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  async alertcrealibro() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inscipción no realizada',
      subHeader: 'Has de crear y finalizar el cuento antes de inscribir',
      message: 'Por favor  crea el cuento antes de participar en el concurso',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  async alertaNoHayLibroCreado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Consulta no realizada',
      subHeader: 'Este alumno aun no ha creado su libro',
      message: 'Tu compañero tiene que crear su libro para que tu puedas verlo',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  public irACrearLibro() {

    this.router.navigate(['/libro']);

  }

  irALibro() {
    if (this.hayLibroFinalizado == true) {
      this.router.navigate(["reproductor/" + '1']);

    }
    else {
      this.router.navigate(["listaescenas/" + this.idLibro]);

    }
  }

  public iravotaciones() {

    localStorage.setItem("idconcurso", this.idconcurso);
    this.router.navigate(['/votacionesconcurso']);

  }

  public iraresultados() {

    localStorage.setItem("idconcurso", this.idconcurso);
    this.router.navigate(['/resultadosconcurso']);

  }



  obtenerfecha() {
    this.date = new Date().toISOString();
    this.date = this.date.toString().split('T');
    this.date = this.date[0];
    console.log(this.date);

    if (this.date >= this.dateFinInscripcion && this.date <= this.dateFinVotacion) {
      this.diafrontera = true;
    }
    else if(this.date < this.dateFinInscripcion)
    {
      this.aunhaytiempo = true;
    }
    else if(this.date > this.dateFinVotacion)
    {
      this.muestraresul = true;
    }
  
  }

  getLibroAlumno(id) {
    this.peticionesAPI.getLibroAlumnoJuego(id)
      .subscribe((res) => {

        if (res.length != 0) {

          localStorage.setItem("idLibroVer", res[0].id)
          this.router.navigate(["reproductor/" + '2']);

        }
        else {
          this.alertaNoHayLibroCreado();

        }


      }, (err) => {


      })
  }
  salir()
  {
     this.router.navigate(["login"]);
  }
  libroAlumnoSeleccionado(alumno) {

    this.peticionesAPI.obtenerAlumnosJuegoLibro(this.id)
      .subscribe((res) => {

        res.forEach(element => {

          if (element.alumnoID == alumno.id) {

            this.getLibroAlumno(element.id);


          }
        });

      }, (err) => {

      })

  }


}