# 🩻 Proyecto de Radiología e Imagen

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
<center><a href="https://imgbb.com/"><img src="https://i.ibb.co/VMfcb2z/minecode-removebg-preview.png" alt="500px" border="500px" /></a><center>
</head>
<body>  
    <h1>MineCode Empresa de Software</h1>
    <center> <a href="https://ibb.co/LJr52s3"><img src="https://i.ibb.co/mX08MP3/Captura-de-pantalla-2024-04-18-101358.png" alt="100px" border="0" /></a><center>


## 📚 Descripción del Proyecto

Este proyecto está dedicado a la creación de una **plataforma avanzada** para la gestión y visualización de estudios de radiología e imagen médica. Nuestra misión es mejorar la precisión y eficiencia en el diagnóstico médico, proporcionando herramientas intuitivas y potentes para profesionales de la salud y pacientes.


## 🎯 Objetivos del Proyecto

### Objetivo General
Desarrollar una **plataforma integral** que optimice la gestión y visualización de imágenes médicas, potenciando la precisión diagnóstica.

### Objetivos Específicos
- **Automatizar** el almacenamiento y recuperación de estudios de imagen médica.
- **Facilitar** la colaboración entre profesionales de la salud mediante herramientas de anotación.
- **Optimizar** la visualización de imágenes con herramientas avanzadas.
- **Mejorar** la accesibilidad a los estudios para los pacientes desde cualquier lugar.

---

  <h2>Información Adicional</h2>
        <p>Además de los objetivos mencionados, el proyecto también tiene como metas:</p>
        <ul>
            <li>Facilitar el acceso rápido y seguro a los estudios radiológicos por parte del personal médico.</li>
            <li>Mejorar la comunicación entre radiólogos, médicos y pacientes, mediante la integración de esta herramienta</li>
            <li>Garantizar la privacidad y seguridad de la información médica, cumpliendo con las regulaciones y estándares de protección de datos.</li>
            <li>Proporcionar una interfaz de usuario intuitiva y amigable, que permita una fácil navegación y uso del sistema por parte del personal médico.</li>
        </ul>

## 👥 Colaboradores

- **📄 Alexis Gomez Gaona** - *Documentador*
- **💻 Armando Carrasco Vargas** - *Front End*
- **🖥️ Juan Manuel Cruz Ortiz** - *Back End*
- **📝 Janeth Ahuacatitla Amixtlan** - *Documentación*

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js
- JavaScript
- MYSQL
- Vue.js
- Git

  <h1>Tecnologías utilizadas en el desarrollo del proyecto Radiología e Imagen</h1>
    <table>
        <tr>
            <th>Tecnología</th>
            <th>Descripción</th>
            <th>Por qué se usó</th>
        </tr>
        <tr>
            <td>MySQL</td>
            <td>Sistema de gestión de bases de datos relacional.</td>
            <td>MySQL se empleó para almacenar datos estructurados relacionados con la información de los pacientes, informes médicos, y otros datos relacionados con la práctica médica.</td>
        </tr>
        <tr>
            <td>Vue.js</td>
            <td>Framework progresivo de JavaScript para construir interfaces de usuario.</td>
            <td>Vue.js se utilizó para desarrollar una interfaz de usuario interactiva y receptiva, permitiendo una experiencia fluida para los usuarios al interactuar con la aplicación de Radiología e Imagen.</td>
        </tr>
        <tr>
            <td>JavaScript</td>
            <td>Lenguaje de programación utilizado tanto en el frontend como en el backend.</td>
            <td>JavaScript es fundamental en el desarrollo de aplicaciones web modernas, se utilizó tanto en el frontend (Vue.js) como en el backend para la lógica de la aplicación y la interacción con las bases de datos.</td>
        </tr>
         <tr>
            <td>Node.js</td>
            <td>Entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript.</td>
            <td> Es un entorno de ejecución para JavaScript que permite ejecutar código JavaScript fuera del navegador web, permitiendo usar JavaScript tanto en el frontend como en el backend, facilitando el desarrollo full-stack con un solo lenguaje de programación.</td>
        </tr>
        <tr>
            <td>Git</td>
            <td>sistema de control de versiones distribuido que se utiliza para gestionar y seguir los cambios en el código fuente de proyectos de software. </td>
            <td>Git permite a los desarrolladores llevar un registro de los cambios en el código a lo largo del tiempo. Es distribuido, lo que significa que cada desarrollador tiene una copia completa del historial del proyecto en su máquina local</td>
        </tr>
    </table>


---
### Estructuras de las Tablas

 Tabla "tbc_estudios"
 
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Tipo = Column(String(50), nullable=False)
    Nivel_Urgencia = Column(String(50), nullable=False)
    #Solicitud_ID = Column(Integer, ForeignKey("tbd_solicitudes.ID"), nullable=False)
    #Consumibles_ID = Column(Integer, ForeignKey("tbc_consumibles.id"), nullable=True)
    Estatus = Column(String(50), nullable=False)
    Total_Costo = Column(DECIMAL(10, 2), nullable=False)
    Dirigido_A = Column(String(100), nullable=True)
    Observaciones = Column(Text, nullable=True)
    Fecha_Registro = Column(DateTime, nullable=False)
    Fecha_Actualizacion = Column(DateTime, nullable=True)
    
  Tabla "tbd_resultados_estudios"
  
    ID = Column(Integer, primary_key=True, autoincrement=True)
    Paciente_ID = Column(Integer, ForeignKey("tbb_pacientes.Persona_ID"), nullable=False)
    Personal_Medico_ID = Column(Integer, ForeignKey("tbb_personal_medico.Persona_ID"), nullable=False)
    Estudio_ID = Column(Integer, ForeignKey("tbc_estudios.ID"), nullable=False)
    Folio = Column(String(50), nullable=False, unique=True)
    Resultados = Column(Text, nullable=False)
    Observaciones = Column(Text, nullable=False)
    Estatus = Column(Enum(
        'Pendiente',
        'En Proceso',
        'Completado',
        'Aprobado',
        'Rechazado'
    ), nullable=True)
    Fecha_Registro = Column(DateTime, nullable=False, default=func.now())
    Fecha_Actualizacion = Column(DateTime, nullable=True, onupdate=func.now())

---
### API endpoints
   ESTUDIOS

--> Este endpoint devuelve una lista de estudios, Llama a la función get_estudios en la capa CRUD para obtener la lista de estudios desde la base de datos y la devuelve.
      
      @estudios.get("/estudios/", response_model=List[schemas.estudios.Estudios], tags=["Estudios"], dependencies=[Depends(Portador())])
      def read_estudios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
          db_estudios = crud.estudios.get_estudios(db=db, skip=skip, limit=limit)
          return db_estudios


--> Este endpoint devuelve los detalles de un estudio específico según su ID, llama a la función get_estudio en la capa CRUD. Si el estudio no existe, lanza una excepción 404 Not Found.
      
       @estudios.get("/estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Estudios"], dependencies=[Depends(Portador())])
       def read_estudio(id: int, db: Session = Depends(get_db)):
           db_estudio = crud.estudios.get_estudio(db=db, id=id)
           if db_estudio is None:
               raise HTTPException(status_code=404, detail="Estudio no encontrado")
    return db_estudio


--> Este endpoint crea un nuevo estudio en la base de datos, llama a la función create_estudio en la capa CRUD y guarda el nuevo estudio en la base de datos.
       
       @estudios.post("/estudio/", response_model=schemas.estudios.Estudios, tags=["Estudios"])
       def create_estudio(estudio: schemas.estudios.EstudiosCreate, db: Session = Depends(get_db)):
           # Asumiendo que no hay un método para verificar duplicados de 'Estudio'
           return crud.estudios.create_estudio(db=db, estudio=estudio)
           
<h2>Ejemplo</h2>
 <a href="https://ibb.co/Tc7xnHQ"><img src="https://i.ibb.co/dBVw3QN/CREAR.png" alt="CREAR" border="0"></a>

 <a href="https://ibb.co/QQHr5kv"><img src="https://i.ibb.co/xLgJ4Yq/Captura-de-pantalla-2024-08-23-121807.png" alt="Captura-de-pantalla-2024-08-23-121807" border="0"></a>

### ------------------------------------------------------------------------------------------------------------------------




--> Este endpoint actualiza los datos de un estudio existente, llama a la función update_estudio en la capa CRUD. Si el estudio no existe, lanza una excepción 404 Not Found.
     
     @estudios.put("/estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Estudios"], dependencies=[Depends(Portador())])
     def update_estudio(id: int, estudio: schemas.estudios.EstudiosUpdate, db: Session = Depends(get_db)):
         db_estudio = crud.estudios.update_estudio(db=db, id=id, estudio=estudio)
         if db_estudio is None:
             raise HTTPException(status_code=404, detail="Estudio no existe, no actualizado")
         return db_estudio

<h2>Ejemplo</h2>
<a href="https://ibb.co/hmLY6CL"><img src="https://i.ibb.co/71jkfbj/insertar.png" alt="insertar" border="0"></a>
<a href="https://ibb.co/nBSWy4H"><img src="https://i.ibb.co/2SBbrRD/Captura-de-pantalla-2024-08-23-123615.png" alt="Captura-de-pantalla-2024-08-23-123615" border="0"></a>


### ------------------------------------------------------------------------------------------------------------------------






--> Este endpoint elimina un estudio específico de la base de datos.
       
       @estudios.delete("/estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Estudios"], dependencies=[Depends(Portador())])
       def delete_estudio(id: int, db: Session = Depends(get_db)):
           db_estudio = crud.estudios.delete_estudio(db=db, id=id)
           if db_estudio is None:
               raise HTTPException(status_code=404, detail="Estudio no existe, no se pudo eliminar")
           return db_estudio


<h2>Ejemplo</h2>
<a href="https://ibb.co/MNk22Mv"><img src="https://i.ibb.co/C0K11hc/eliminar.png" alt="eliminar" border="0"></a>
<a href="https://ibb.co/6njdVTp"><img src="https://i.ibb.co/RvR5ZsM/Captura-de-pantalla-2024-08-23-123637.png" alt="Captura-de-pantalla-2024-08-23-123637" border="0"></a>

### ------------------------------------------------------------------------------------------------------------------------



           
   RESULTADOS ESTUDIOS

  --> Este endpoint devuelve una lista paginada de los resultados de estudios.
  
    @resultados_estudios.get("/resultados-estudios/", response_model=List[schemas.estudios.Estudios], tags=["Resultados Estudios"], dependencies=[Depends(Portador())])
    def read_resultados_estudios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
        db_estudios = crud.estudios.get_estudios(db=db, skip=skip, limit=limit)
        return db_estudios

        
 --> Este endpoint devuelve un resultado de estudio específico por su ID.

    @resultados_estudios.get("/resultado-estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Resultados Estudios"], dependencies=[Depends(Portador())])
    def read_resultado_estudio(id: int, db: Session = Depends(get_db)):
        db_estudio = crud.estudios.get_estudio(db=db, id=id)
        if db_estudio is None:
            raise HTTPException(status_code=404, detail="Resultado de estudio no encontrado")
        return db_estudio

        
 --> Este endpoint crea un nuevo resultado de estudio, llama al método create_estudio en la capa CRUD y devuelve el resultado de estudio creado.
 
    @resultados_estudios.post("/resultado-estudio/", response_model=schemas.estudios.Estudios, tags=["Resultados Estudios"])
    def create_resultado_estudio(estudio: schemas.estudios.EstudiosCreate, db: Session = Depends(get_db)):
        # Asumiendo que no hay un método para verificar duplicados de 'Estudio'
        return crud.estudios.create_estudio(db=db, estudio=estudio)

<h2>Ejemplo</h2>
<a href="https://ibb.co/R7s5Xhp"><img src="https://i.ibb.co/qxcZH0M/crear1.png" alt="crear1" border="0"></a>
<a href="https://ibb.co/QQHr5kv"><img src="https://i.ibb.co/xLgJ4Yq/Captura-de-pantalla-2024-08-23-121807.png" alt="Captura-de-pantalla-2024-08-23-121807" border="0"></a>



### ------------------------------------------------------------------------------------------------------------------------

        
 --> Este endpoint actualiza los datos de un resultado de estudio existente.
 
    @resultados_estudios.put("/resultado-estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Resultados Estudios"], dependencies=[Depends(Portador())])
    def update_resultado_estudio(id: int, estudio: schemas.estudios.EstudiosUpdate, db: Session = Depends(get_db)):
        db_estudio = crud.estudios.update_estudio(db=db, id=id, estudio=estudio)
        if db_estudio is None:
            raise HTTPException(status_code=404, detail="Resultado de estudio no existe, no actualizado")
        return db_estudio


<h2>Ejemplo</h2>
<a href="https://ibb.co/jZVZq3j"><img src="https://i.ibb.co/93w3Byd/actualizar2.png" alt="actualizar2" border="0"></a>
<a href="https://ibb.co/ThhTxgT"><img src="https://i.ibb.co/ZTTJpMJ/Captura-de-pantalla-2024-08-23-122008.png" alt="Captura-de-pantalla-2024-08-23-122008" border="0"></a>


### ------------------------------------------------------------------------------------------------------------------------


        
 --> Este endpoint  Elimina un resultado de estudio específico de la base de datos, llama al método delete_estudio en la capa CRUD. Si no encuentra el resultado de estudio, lanza una excepción 404.
 
    @resultados_estudios.delete("/resultado-estudio/{id}", response_model=schemas.estudios.Estudios, tags=["Resultados Estudios"], dependencies=[Depends(Portador())])
    def delete_resultado_estudio(id: int, db: Session = Depends(get_db)):
        db_estudio = crud.estudios.delete_estudio(db=db, id=id)
        if db_estudio is None:
            raise HTTPException(status_code=404, detail="Resultado de estudio no existe, no se pudo eliminar")
        return db_estudio

<h2>Ejemplo</h2>
<a href="https://ibb.co/wdgnktp"><img src="https://i.ibb.co/b6m40tN/eliminar2.png" alt="eliminar2" border="0"></a>
<a href="https://ibb.co/1TJnBDg"><img src="https://i.ibb.co/GR3JGK6/Captura-de-pantalla-2024-08-23-122142.png" alt="Captura-de-pantalla-2024-08-23-122142" border="0"></a>

### ------------------------------------------------------------------------------------------------------------------------





