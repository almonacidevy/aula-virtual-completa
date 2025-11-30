import React, { useState, useEffect } from 'react';
import { Upload, Download, BookOpen, FolderOpen, FileText, Film, FileArchive, Lock, LogOut, Home, Plus, Trash2, Edit2, Save, X, Key } from 'lucide-react';

const AulaVirtual = () => {
  const [currentLayer, setCurrentLayer] = useState('welcome');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordConfig, setShowPasswordConfig] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('');
  const [currentPasswordForChange, setCurrentPasswordForChange] = useState('');
  
  // Estados para edición
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  
  // Datos del aula (en producción vendría de una base de datos)
  const [aulaData, setAulaData] = useState({
    welcomeImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
    welcomeTitle: 'Bienvenido al Aula Virtual',
    welcomeDescription: 'Plataforma educativa para el aprendizaje en línea',
    coursesBackground: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
   courses: [
  {
    id: 1,
    name: 'SketchUp para Principiantes Pro',
    icon: '🏗️',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop',
    modules: [
      {
        id: 1,
        name: 'Módulo 1: Introducción a SketchUp y al Diseño en Melamina',
        files: [
          { name: 'Qué es SketchUp.pdf', type: 'pdf', url: '#' },
          { name: 'Entorno de trabajo.mp4', type: 'video', url: '#' },
          { name: 'Conceptos de melamina.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 2,
        name: 'Módulo 2: Configuración del Proyecto',
        files: [
          { name: 'Configuración de unidades.pdf', type: 'pdf', url: '#' },
          { name: 'Organización del proyecto.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 3,
        name: 'Módulo 3: Herramientas Fundamentales',
        files: [
          { name: 'Herramientas básicas.pdf', type: 'pdf', url: '#' },
          { name: 'Tutorial componentes.mp4', type: 'video', url: '#' },
          { name: 'Ejercicios prácticos.zip', type: 'zip', url: '#' }
        ]
      },
      {
        id: 4,
        name: 'Módulo 4: Construcción de Piezas en Melamina',
        files: [
          { name: 'Crear tableros.pdf', type: 'pdf', url: '#' },
          { name: 'Aplicación de texturas.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 5,
        name: 'Módulo 5: Diseño de Módulos Básicos',
        files: [
          { name: 'Módulo de cocina.pdf', type: 'pdf', url: '#' },
          { name: 'Módulo de closet.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 6,
        name: 'Módulo 6: Aplicación de Herrajes',
        files: [
          { name: 'Ubicación de bisagras.pdf', type: 'pdf', url: '#' },
          { name: 'Correderas y soportes.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 7,
        name: 'Módulo 7: Diseño Completo de un Mueble Real',
        files: [
          { name: 'Proyecto mueble completo.pdf', type: 'pdf', url: '#' },
          { name: 'Ensamblaje paso a paso.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 8,
        name: 'Módulo 8: Render Básico del Mueble',
        files: [
          { name: 'Configuración de render.pdf', type: 'pdf', url: '#' },
          { name: 'Iluminación y materiales.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 9,
        name: 'Módulo 9: Listado de Piezas y Planos de Corte',
        files: [
          { name: 'Despiece de muebles.pdf', type: 'pdf', url: '#' },
          { name: 'Exportación a LayOut.mp4', type: 'video', url: '#' },
          { name: 'Plantilla planos.zip', type: 'zip', url: '#' }
        ]
      },
      {
        id: 10,
        name: 'Módulo 10: Proyecto Final y Certificación',
        files: [
          { name: 'Requisitos proyecto final.pdf', type: 'pdf', url: '#' },
          { name: 'Guía de entrega.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Instalaciones Eléctricas Domiciliarias desde Cero',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop',
    modules: [
      {
        id: 1,
        name: 'Módulo 1: Introducción a la Electricidad',
        files: [
          { name: 'Qué es la electricidad.pdf', type: 'pdf', url: '#' },
          { name: 'Voltaje corriente resistencia.mp4', type: 'video', url: '#' },
          { name: 'Identificación de cables.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 2,
        name: 'Módulo 2: Seguridad Eléctrica en el Hogar',
        files: [
          { name: 'Riesgos eléctricos.pdf', type: 'pdf', url: '#' },
          { name: 'Equipo de protección.mp4', type: 'video', url: '#' },
          { name: 'Cuestionario seguridad.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 3,
        name: 'Módulo 3: Herramientas y Materiales',
        files: [
          { name: 'Herramientas básicas.pdf', type: 'pdf', url: '#' },
          { name: 'Uso del multímetro.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 4,
        name: 'Módulo 4: Circuitos Eléctricos Básicos',
        files: [
          { name: 'Circuitos serie y paralelo.pdf', type: 'pdf', url: '#' },
          { name: 'Interruptor simple.mp4', type: 'video', url: '#' },
          { name: 'Práctica circuito.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 5,
        name: 'Módulo 5: Instalación de Luminarias',
        files: [
          { name: 'Instalación de focos.pdf', type: 'pdf', url: '#' },
          { name: 'Interruptor doble.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 6,
        name: 'Módulo 6: Instalación de Tomacorrientes',
        files: [
          { name: 'Tipos de tomacorrientes.pdf', type: 'pdf', url: '#' },
          { name: 'Polaridad correcta.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 7,
        name: 'Módulo 7: Empalmes y Conexiones Seguras',
        files: [
          { name: 'Tipos de empalmes.pdf', type: 'pdf', url: '#' },
          { name: 'Uso de conectores.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 8,
        name: 'Módulo 8: Pruebas y Verificaciones',
        files: [
          { name: 'Comprobación de continuidad.pdf', type: 'pdf', url: '#' },
          { name: 'Detección de fallas.mp4', type: 'video', url: '#' },
          { name: 'Checklist revisión.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 9,
        name: 'Proyecto Final: Circuito Completo',
        files: [
          { name: 'Requisitos proyecto.pdf', type: 'pdf', url: '#' },
          { name: 'Guía de instalación.mp4', type: 'video', url: '#' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Instalación, Medición y Certificación de Sistemas de Puesta a Tierra',
    icon: '🔌',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop',
    modules: [
      {
        id: 1,
        name: 'Módulo 1: Fundamentos de Seguridad Eléctrica',
        files: [
          { name: 'Conceptos básicos SPT.pdf', type: 'pdf', url: '#' },
          { name: 'Riesgos eléctricos.mp4', type: 'video', url: '#' },
          { name: 'Normativas internacionales.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 2,
        name: 'Módulo 2: Tipos de Sistemas de Puesta a Tierra',
        files: [
          { name: 'Sistemas TT TN IT.pdf', type: 'pdf', url: '#' },
          { name: 'Tipos de electrodos.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 3,
        name: 'Módulo 3: Normativas y Reglamentos',
        files: [
          { name: 'Reglamento nacional.pdf', type: 'pdf', url: '#' },
          { name: 'Documentación requerida.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 4,
        name: 'Módulo 4: Equipos y Herramientas de Medición',
        files: [
          { name: 'Telurímetros y megóhmetros.pdf', type: 'pdf', url: '#' },
          { name: 'Calibración de instrumentos.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 5,
        name: 'Módulo 5: Técnicas de Medición',
        files: [
          { name: 'Método Wenner.pdf', type: 'pdf', url: '#' },
          { name: 'Método Schlumberger.pdf', type: 'pdf', url: '#' },
          { name: 'Fall-of-Potential.mp4', type: 'video', url: '#' },
          { name: 'Procedimientos paso a paso.pdf', type: 'pdf', url: '#' }
        ]
      },
      {
        id: 6,
        name: 'Módulo 6: Interpretación de Resultados',
        files: [
          { name: 'Análisis de valores.pdf', type: 'pdf', url: '#' },
          { name: 'Diagnóstico de fallas.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 7,
        name: 'Módulo 7: Mejoramiento de la Puesta a Tierra',
        files: [
          { name: 'Técnicas para bajar resistencia.pdf', type: 'pdf', url: '#' },
          { name: 'Uso de bentonita y gel.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 8,
        name: 'Módulo 8: Documentación y Certificación',
        files: [
          { name: 'Elaboración de informes.pdf', type: 'pdf', url: '#' },
          { name: 'Formatos de certificación.pdf', type: 'pdf', url: '#' },
          { name: 'Diagramas unifilares.zip', type: 'zip', url: '#' }
        ]
      },
      {
        id: 9,
        name: 'Módulo 9: Casos Prácticos y Ejercicios',
        files: [
          { name: 'Ejercicios de interpretación.pdf', type: 'pdf', url: '#' },
          { name: 'Errores comunes en campo.mp4', type: 'video', url: '#' }
        ]
      },
      {
        id: 10,
        name: 'Módulo 10: Práctica Final y Certificación',
        files: [
          { name: 'Prueba teórica.pdf', type: 'pdf', url: '#' },
          { name: 'Proyecto final.pdf', type: 'pdf', url: '#' },
          { name: 'Guía de certificación.pdf', type: 'pdf', url: '#' }
        ]
      }
    ]
  }
]
  // Contraseñas almacenadas (en producción estarían hasheadas en el servidor)
  const [passwords, setPasswords] = useState(() => {
    const stored = localStorage.getItem('aulaPasswords');
    return stored ? JSON.parse(stored) : {
      admin: 'admin123',
      student: 'estudiante123'
    };
  });

  // Guardar contraseñas cuando cambien
  useEffect(() => {
    localStorage.setItem('aulaPasswords', JSON.stringify(passwords));
  }, [passwords]);

  const handleLogin = () => {
    if (password === passwords.admin) {
      setIsAdmin(true);
      setIsAuthenticated(true);
      setCurrentLayer('courses');
      setPassword('');
    } else if (password === passwords.student) {
      setIsAdmin(false);
      setIsAuthenticated(true);
      setCurrentLayer('courses');
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentLayer('welcome');
    setSelectedCourse(null);
    setSelectedModule(null);
    setEditMode(false);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'video': return <Film className="w-5 h-5" />;
      case 'zip': return <FileArchive className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleAddCourse = () => {
    const newCourse = {
      id: Date.now(),
      name: 'Nuevo Curso',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      modules: []
    };
    setAulaData({...aulaData, courses: [...aulaData.courses, newCourse]});
  };

  const handleAddModule = (courseId) => {
    const newModule = {
      id: Date.now(),
      name: 'Nuevo Módulo',
      files: []
    };
    const updatedCourses = aulaData.courses.map(course => {
      if (course.id === courseId) {
        return {...course, modules: [...course.modules, newModule]};
      }
      return course;
    });
    setAulaData({...aulaData, courses: updatedCourses});
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('¿Estás seguro de eliminar este curso?')) {
      setAulaData({
        ...aulaData,
        courses: aulaData.courses.filter(c => c.id !== courseId)
      });
    }
  };

  const handleDeleteModule = (courseId, moduleId) => {
    if (window.confirm('¿Estás seguro de eliminar este módulo?')) {
      const updatedCourses = aulaData.courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.filter(m => m.id !== moduleId)
          };
        }
        return course;
      });
      setAulaData({...aulaData, courses: updatedCourses});
    }
  };

  const startEdit = (item, type) => {
    setEditingItem({...item, type});
    setEditName(item.name);
    setEditImage(item.image || '');
  };

  const saveEdit = () => {
    if (editingItem.type === 'course') {
      const updatedCourses = aulaData.courses.map(course => {
        if (course.id === editingItem.id) {
          return {...course, name: editName, image: editImage};
        }
        return course;
      });
      setAulaData({...aulaData, courses: updatedCourses});
    } else if (editingItem.type === 'module') {
      const updatedCourses = aulaData.courses.map(course => {
        if (course.id === selectedCourse.id) {
          return {
            ...course,
            modules: course.modules.map(module => {
              if (module.id === editingItem.id) {
                return {...module, name: editName};
              }
              return module;
            })
          };
        }
        return course;
      });
      setAulaData({...aulaData, courses: updatedCourses});
    }
    setEditingItem(null);
    setEditName('');
    setEditImage('');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(aulaData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aula-virtual-data.json';
    link.click();
  };

  const handleChangePasswords = () => {
    if (currentPasswordForChange !== passwords.admin) {
      alert('Contraseña administrativa actual incorrecta');
      return;
    }
    
    if (!newAdminPassword || !newStudentPassword) {
      alert('Debe completar ambas contraseñas');
      return;
    }

    if (newAdminPassword.length < 6 || newStudentPassword.length < 6) {
      alert('Las contraseñas deben tener al menos 6 caracteres');
      return;
    }

    setPasswords({
      admin: newAdminPassword,
      student: newStudentPassword
    });

    setShowPasswordConfig(false);
    setNewAdminPassword('');
    setNewStudentPassword('');
    setCurrentPasswordForChange('');
    alert('Contraseñas actualizadas correctamente');
  };

  // Renderizado de capas
  const renderWelcome = () => (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{backgroundImage: `url(${aulaData.welcomeImage})`}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white p-8 max-w-2xl">
        <h1 className="text-6xl font-bold mb-6">{aulaData.welcomeTitle}</h1>
        <p className="text-2xl mb-8">{aulaData.welcomeDescription}</p>
        {!isAuthenticated ? (
          <div className="bg-white bg-opacity-90 p-8 rounded-lg max-w-md mx-auto">
            <Lock className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso al Aula</h2>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 text-gray-800 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Ingresar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCurrentLayer('courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Entrar al Aula
          </button>
        )}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{backgroundImage: `url(${aulaData.coursesBackground})`}}
    >
      <div className="bg-black bg-opacity-70 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Mis Cursos</h1>
            <div className="flex gap-4">
              {isAdmin && (
                <>
                  <button
                    onClick={handleAddCourse}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Agregar Curso
                  </button>
                  <button
                    onClick={() => setShowPasswordConfig(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Key className="w-5 h-5" /> Cambiar Contraseñas
                  </button>
                  <button
                    onClick={exportData}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Exportar Datos
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Salir
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aulaData.courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{backgroundImage: `url(${course.image})`}}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-6xl">{course.icon}</span>
                  </div>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => startEdit(course, 'course')}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-4">{course.modules.length} módulos disponibles</p>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setCurrentLayer('modules');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Acceder al Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingItem && editingItem.type === 'course' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Curso</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nombre del curso"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <input
              type="text"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              placeholder="URL de imagen"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                <Save className="w-4 h-4 inline mr-2" /> Guardar
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
              >
                <X className="w-4 h-4 inline mr-2" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para cambiar contraseñas */}
      {showPasswordConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-8 h-8 text-yellow-600" />
              <h3 className="text-2xl font-bold">Configurar Contraseñas</h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Contraseña Administrativa Actual
              </label>
              <input
                type="password"
                value={currentPasswordForChange}
                onChange={(e) => setCurrentPasswordForChange(e.target.value)}
                placeholder="Ingrese contraseña actual"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nueva Contraseña Administrador
              </label>
              <input
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nueva Contraseña Estudiante
              </label>
              <input
                type="password"
                value={newStudentPassword}
                onChange={(e) => setNewStudentPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-700">
                <strong>Importante:</strong> Guarde las nuevas contraseñas en un lugar seguro. No podrán ser recuperadas.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleChangePasswords}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-bold transition"
              >
                <Save className="w-4 h-4 inline mr-2" /> Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setShowPasswordConfig(false);
                  setNewAdminPassword('');
                  setNewStudentPassword('');
                  setCurrentPasswordForChange('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-bold transition"
              >
                <X className="w-4 h-4 inline mr-2" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderModules = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentLayer('courses')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Home className="w-5 h-5" /> Volver
            </button>
            <h1 className="text-4xl font-bold text-gray-800">{selectedCourse?.name}</h1>
          </div>
          {isAdmin && (
            <button
              onClick={() => handleAddModule(selectedCourse.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Agregar Módulo
            </button>
          )}
        </div>

        <div className="grid gap-4">
          {selectedCourse?.modules.map(module => (
            <div key={module.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 flex-1">
                  <FolderOpen className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{module.name}</h3>
                    <p className="text-gray-600">{module.files.length} archivos</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => startEdit(module, 'module')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(selectedCourse.id, module.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSelectedModule(module);
                      setCurrentLayer('files');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Ver Contenido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingItem && editingItem.type === 'module' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Módulo</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nombre del módulo"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                <Save className="w-4 h-4 inline mr-2" /> Guardar
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
              >
                <X className="w-4 h-4 inline mr-2" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFiles = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentLayer('modules')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Home className="w-5 h-5" /> Volver
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{selectedModule?.name}</h1>
              <p className="text-gray-600">{selectedCourse?.name}</p>
            </div>
          </div>
          {isAdmin && (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Upload className="w-5 h-5" /> Subir Archivo
            </button>
          )}
        </div>

        <div className="grid gap-4">
          {selectedModule?.files.map((file, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{file.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{file.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                  <Download className="w-4 h-4" /> Descargar
                </button>
                {isAdmin && (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedModule?.files.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No hay archivos en este módulo</p>
            {isAdmin && <p className="text-gray-500 mt-2">Haz clic en "Subir Archivo" para agregar contenido</p>}
          </div>
        )}
      </div>
    </div>
  );

  // Render principal
  return (
    <div className="font-sans">
      {currentLayer === 'welcome' && renderWelcome()}
      {currentLayer === 'courses' && renderCourses()}
      {currentLayer === 'modules' && renderModules()}
      {currentLayer === 'files' && renderFiles()}
    </div>
  );
};

export default AulaVirtual;