//This file is used for customer demonstration
export let sessionQuizDescriptionJavaScript = [
    {
        idQuiz: 1,
        name: "Quiz n°1",
        modeQuiz: "evaluation",
        commentaireQuiz: "Ce quiz est en mode 'Evaluation', une seule tentative possible"
    },
    {
        idQuiz: 2,
        name: "Quiz n°2",
        modeQuiz: "training",
        commentaireQuiz: "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois"
    },
    {
        idQuiz: 3,
        name: "Quiz n°3",
        modeQuiz: "evaluation",
        commentaireQuiz: "Ce quiz est en mode 'Evaluation', une seule tentative possible"
    },
    {
        idQuiz: 4,
        name: "Quiz n°4",
        modeQuiz: "evaluation",
        commentaireQuiz: "Ce quiz est en mode 'Evaluation', une seule tentative possible"
    },
    {
        idQuiz: 5,
        name: "Quiz n°5",
        modeQuiz: "training",
        commentaireQuiz: "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois"
    }
];

export let sessionAdminQuestionsJavaScript = [
    {
        "idQuiz": 1,
        "questions": [
            {
                "id": 1,
                "typeQuestion": "radio",
                "question": "Où est située la société Okalys ?",
                "choix": [
                    "St Avé",
                    "Plescop",
                    "Séné"
                ],
                "reponse": "Séné"
            },
            {
                "id": 2,
                "typeQuestion": "checkBox",
                "question": "Couleur(s) du logo d'Okalys ?",
                "choix": [
                    "Bleu",
                    "Vert",
                    "Orange",
                    "Noir"
                ],
                "reponse": [
                    "Noir",
                    "Orange"
                ]
            },
            {
                "id": 3,
                "typeQuestion": "radio",
                "question": "Que commercialise Okalys ?",
                "choix": [
                    "Logiciel de comptabilité",
                    "Appli de sales enablement",
                    "Appli e-commerce"
                ],
                "reponse": "Appli de sales enablement"
            },
            {
                "id": 4,
                "typeQuestion": "slideBar",
                "question": "Nombre de commerciaux chez Okalys",
                "interval": 2,
                "etendue": 10,
                "reponse": 2
            }
        ]
    },
    {
        "idQuiz": 2,
        "questions": [
            {
                "id": 1,
                "typeQuestion": "slideBar",
                "question": "Nombre de développeur(s) chez Okalys ?",
                "interval": 1,
                "etendue": 10,
                "reponse": 3
            },
            {
                "id": 2,
                "typeQuestion": "trueFalse",
                "question": "TouchAndSell, SalesApps et Noledge sont des clients de Okalys.",
                "choix": [
                    "Vrai",
                    "Faux"
                ],
                "reponse": "Faux"
            },
            {
                "id": 3,
                "typeQuestion": "checkBox",
                "question": "Qui sont les clients de Okalys ?",
                "choix": [
                    "Urgo",
                    "Bigard",
                    "Daucy",
                    "Connetable"
                ],
                "reponse": [
                    "Connetable",
                    "Daucy",
                    "Urgo"
                ]
            }
        ]
    },
    {
        "idQuiz": 3,
        "questions": [
            {
                "id": 1,
                "typeQuestion": "radio",
                "question": "Combien de type de questions existe t' il dans ce module eLearning ?",
                "choix": [
                    "2",
                    "4",
                    "6"
                ],
                "reponse": "4"
            },
            {
                "id": 2,
                "typeQuestion": "slideBar",
                "question": "Combien de réponses possible avec une question à choix unique ?",
                "interval": 1,
                "etendue": 20,
                "reponse": 1
            },
            {
                "id": 3,
                "typeQuestion": "checkBox",
                "question": "Les différentes technos utilisées chez Okalys pour ce module eLearning ?",
                "choix": [
                    "JavaScript",
                    "Java",
                    "PHP",
                    "C++",
                    "SASS"
                ],
                "reponse": [
                    "JavaScript",
                    "PHP"
                ]
            },
            {
                "id": 4,
                "typeQuestion": "trueFalse",
                "question": "Ce module eLearning comprend un mode de consultation des résultats ?",
                "choix": [
                    "Vrai",
                    "Faux"
                ],
                "reponse": "Vrai"
            },
            {
                "id": 5,
                "typeQuestion": "radio",
                "question": "Quand a été créé Okalys ?",
                "choix": [
                    "2002",
                    "2006",
                    "2010",
                    "2012"
                ],
                "reponse": "2006"
            },
            {
                "id": 6,
                "typeQuestion": "trueFalse",
                "question": "La PWA consiste à installer une application via le navigateur ?",
                "choix": [
                    "Vrai",
                    "Faux"
                ],
                "reponse": "Vrai"
            },
            {
                "id": 7,
                "typeQuestion": "radio",
                "question": "Ce questionnaire de performance est fait avec :",
                "choix": [
                    "ReactJs",
                    "VueJs",
                    "Angular"
                ],
                "reponse": "VueJs"
            },
            {
                "id": 8,
                "typeQuestion": "checkBox",
                "question": "Quels sont les prospects actuels de Okalys ?",
                "choix": [
                    "Advini",
                    "Carambar",
                    "Lafarge",
                    "Vico"
                ],
                "reponse": [
                    "Advini",
                    "Carambar"
                ]
            }
        ]
    },
    {
        "idQuiz": 4,
        "questions": [
            {
                "id": 1,
                "typeQuestion": "trueFalse",
                "question": "Urgo est un client de l'agroalimentaire.",
                "choix": [
                    "Vrai",
                    "Faux"
                ],
                "reponse": "Faux"
            },
            {
                "id": 2,
                "typeQuestion": "checkBox",
                "question": "Les avantages d'utiliser le sales enablement de Okalys ?",
                "choix": [
                    "Utilisation Off-Line",
                    "PWA",
                    "Fonctionnel sur l'app Store",
                    "L'interfaçage (CRM, PIM, etc ...)"
                ],
                "reponse": [
                    "L'interfaçage (CRM, PIM, etc ...)",
                    "PWA",
                    "Utilisation Off-Line"
                ]
            }
        ]
    },
    {
        "idQuiz": 5,
        "questions": [
            {
                "id": 1,
                "typeQuestion": "trueFalse",
                "question": "Okalys est labelisé 'Produit en Bretagne' ?",
                "choix": [
                    "Vrai",
                    "Faux"
                ],
                "reponse": "Vrai"
            },
            {
                "id": 2,
                "typeQuestion": "radio",
                "question": "Ce questionnaire de performance est fait avec :",
                "choix": [
                    "JavaScript",
                    "Php",
                    "Python"
                ],
                "reponse": "JavaScript"
            },
            {
                "id": 3,
                "typeQuestion": "checkBox",
                "question": "Citez le ou les prospects actuels.",
                "choix": [
                    "Réseau Le Saint",
                    "Marie",
                    "CasseGrain",
                    "Danone"
                ],
                "reponse": [
                    "Réseau Le Saint"
                ]
            }
        ]
    }
]

export let sessionUserResultsJavaScript = [
    {
        "nameUser": "VHA",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "25%",
                "points": 1,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 2,
                "resultPercent": "67%",
                "points": 2,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "100%",
                "points": 8,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 1,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 3,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            }
        ]
    },
    {
        "nameUser": "COR",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 2,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 1,
                "resultPercent": "0%",
                "points": 0,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "62%",
                "points": 5,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 1,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 3,
                "resultPercent": "33%",
                "points": 1,
                "numberQuestions": 3
            }
        ]
    },
    {
        "nameUser": "CCA",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 2,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 1,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 4,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "100%",
                "points": 2,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 3,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            }
        ]
    },
    {
        "nameUser": "CCO",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "25%",
                "points": 1,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 4,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "100%",
                "points": 8,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "100%",
                "points": 2,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 1,
                "resultPercent": "66%",
                "points": 2,
                "numberQuestions": 3
            }
        ]
    },
    {
        "nameUser": "ACPA",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "100%",
                "points": 4,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 2,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "87%",
                "points": 7,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "0%",
                "points": 0,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 3,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            }
        ]
    },
    {
        "nameUser": "GHA",
        "quizData": [
            {
                "idQuiz": 1,
                "name": "Quiz n°1",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "75%",
                "points": 3,
                "numberQuestions": 4
            },
            {
                "idQuiz": 2,
                "name": "Quiz n°2",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 5,
                "resultPercent": "100%",
                "points": 3,
                "numberQuestions": 3
            },
            {
                "idQuiz": 3,
                "name": "Quiz n°3",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "25%",
                "points": 2,
                "numberQuestions": 8
            },
            {
                "idQuiz": 4,
                "name": "Quiz n°4",
                "modeQuiz": "evaluation",
                "commentaireQuiz": "Ce quiz est en mode 'Evaluation', une seule tentative possible",
                "resultPercent": "50%",
                "points": 1,
                "numberQuestions": 2
            },
            {
                "idQuiz": 5,
                "name": "Quiz n°5",
                "modeQuiz": "training",
                "commentaireQuiz": "Ce quiz est en mode 'Entrainement', possibilité d'effectuer ce quiz plusieurs fois",
                "nbreTentative": 2,
                "resultPercent": "66%",
                "points": 2,
                "numberQuestions": 3
            }
        ]
    }
]

export let sessionUserResponsesJavaScript = [
    {
        "nameUser": "VHA",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Logiciel de comptabilité"
                    },
                    {
                        "id": 4,
                        "reponse": "4"
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": "Faux"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Connetable",
                            "Daucy",
                            "Urgo"
                            
                            
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": 1
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript",
                            "PHP"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 5,
                        "reponse": 2006
                    },
                    {
                        "id": 6,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 7,
                        "reponse": "VueJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Advini",
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA",
                            "Utilisation Off-Line"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": "JavaScript"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "nameUser": "COR",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Appli de sales enablement"
                    },
                    {
                        "id": 4,
                        "reponse": "10"
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Urgo",
                            "Connetable"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": 2
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Faux"
                    },
                    {
                        "id": 5,
                        "reponse": 2006
                    },
                    {
                        "id": 6,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 7,
                        "reponse": "VueJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Advini",
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA",
                            "Utilisation Off-Line"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": "Python"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint",
                            "Marie"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "nameUser": "CCA",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Appli de sales enablement"
                    },
                    {
                        "id": 4,
                        "reponse": "1"
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "3"
                    },
                    {
                        "id": 2,
                        "reponse": "Faux"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Connetable",
                            "Daucy",
                            "Urgo"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "2"
                    },
                    {
                        "id": 2,
                        "reponse": 2
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Faux"
                    },
                    {
                        "id": 5,
                        "reponse": 2006
                    },
                    {
                        "id": 6,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 7,
                        "reponse": "VueJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Advini",
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA",
                            "Utilisation Off-Line"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": "JavaScript"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "nameUser": "CCO",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Logiciel de comptabilité"
                    },
                    {
                        "id": 4,
                        "reponse": "4"
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "3"
                    },
                    {
                        "id": 2,
                        "reponse": "Faux"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Connetable",
                            "Daucy",
                            "Urgo"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": 1
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript",
                            "PHP"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 5,
                        "reponse": 2006
                    },
                    {
                        "id": 6,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 7,
                        "reponse": "VueJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Advini",
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA",
                            "Utilisation Off-Line"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": "JavaScript"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "nameUser": "ACPA",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Noir",
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Appli de sales enablement"
                    },
                    {
                        "id": 4,
                        "reponse": 2
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "3"
                    },
                    {
                        "id": 2,
                        "reponse": "Faux"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Connetable",
                            "Daucy",
                            "Urgo"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "4"
                    },
                    {
                        "id": 2,
                        "reponse": 2
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript",
                            "PHP"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 5,
                        "reponse": 2006
                    },
                    {
                        "id": 6,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 7,
                        "reponse": "VueJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Advini",
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 2,
                        "reponse": "JavaScript"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "nameUser": "GHA",
        "quizResponse": [
            {
                "idQuiz": 1,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Séné"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "Noir",
                            "Orange"
                        ]
                    },
                    {
                        "id": 3,
                        "reponse": "Appli de sales enablement"
                    },
                    {
                        "id": 4,
                        "reponse": 6
                    }
                ]
            },
            {
                "idQuiz": 2,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "3"
                    },
                    {
                        "id": 2,
                        "reponse": "Faux"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Connetable",
                            "Daucy",
                            "Urgo"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 3,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "2"
                    },
                    {
                        "id": 2,
                        "reponse": 8
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "JavaScript",
                            "PHP"
                        ]
                    },
                    {
                        "id": 4,
                        "reponse": "Vrai"
                    },
                    {
                        "id": 5,
                        "reponse": 2010
                    },
                    {
                        "id": 6,
                        "reponse": "Faux"
                    },
                    {
                        "id": 7,
                        "reponse": "ReactJs"
                    },
                    {
                        "id": 8,
                        "reponse": [
                            "Carambar"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 4,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": [
                            "L'interfaçage (CRM, PIM, etc ...)",
                            "PWA"
                        ]
                    }
                ]
            },
            {
                "idQuiz": 5,
                "listResponse": [
                    {
                        "id": 1,
                        "reponse": "Faux"
                    },
                    {
                        "id": 2,
                        "reponse": "JavaScript"
                    },
                    {
                        "id": 3,
                        "reponse": [
                            "Réseau Le Saint"
                        ]
                    }
                ]
            }
        ]
    }
]