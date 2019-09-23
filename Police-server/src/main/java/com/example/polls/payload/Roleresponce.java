package com.example.polls.payload;

import java.util.List;

import com.example.polls.model.Role;

public class Roleresponce {
    private List<Role> list;
    

    public Roleresponce(List<Role> list) {
    	this.list = list;
       
    }
    public List<Role> getlist() {
        return this.list;
    }

    
}
