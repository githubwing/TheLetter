'use strict'

var LetterItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.content = obj.content;
        this.author = obj.author;
    }
};

LetterItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheLetter = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new LetterItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheLetter.prototype ={
    init:function(){
        
    },

    save:function(title,content){
        if(!title || !content){
            throw new Error("empty title or content")
        }

        if(title.length > 20 || content.length > 500){
            throw new Error("title or content  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var letterItem = this.data.get(title);
        if(letterItem){
            throw new Error("letter has been occupied");
        }

        letterItem = new LetterItem();
        letterItem.author = from;
        letterItem.title = title;
        letterItem.content = content;

        this.data.put(title,letterItem);
    },

    get:function(title){
        if(!title){
            throw new Error("empty title")
        }
        return this.data.get(title);
    }
}

module.exports = TheLetter;