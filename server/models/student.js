var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  birthdate: {type: String, required: true},
  lessons: [],
  _user: {type:Schema.Types.ObjectId, ref: 'User'},
  instructors: [{type: Schema.Types.ObjectId, ref: 'Istructor'}],


  created_at: {type: Date},
  //
  // LEVELS
  //

  levels: [

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },


    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    },

    {

      name: {type: String},

      skills: [
        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        },

        {
          skill: {type: String},
          pass: 0,
          sticker: {type: String}
        }
      ],

    }


  ]

})

var Student = mongoose.model('Student', StudentSchema);
