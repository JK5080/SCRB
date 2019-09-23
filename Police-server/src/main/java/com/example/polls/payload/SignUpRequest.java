package com.example.polls.payload;

import javax.validation.constraints.*;

public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;
    
    @NotBlank
    private String pen;
    
    @NotBlank
    private String rank;
    
    @NotBlank
    private String unit;
    
    @NotBlank
    private String dob;
    
    @NotBlank
    private String doe;
    @NotBlank
    private String utype;
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPen() {
    	return pen;
    }
    public void setPen(String pen) {
    	this.pen=pen;
    }
    
    public String getRank() {
    	return rank;
    }
    public void setRank(String rank) {
    	this.rank=rank;
    }
    
    public String getUnit() {
    	return unit;
    }
    public void setUnit(String unit) {
    	this.unit = unit;
    }
    
    public String getDob() {
    	return dob;
    }
    public void setDob(String dob) {
    	this.dob = dob;
    }
    
    
    public String getDoe() {
    	return doe;
    }
    public void setDoe(String doe) {
    	this.doe = doe;
    }
    
    public String getUtype() {
    	return utype;
    }
    public void setUtype(String utype) {
    	this.utype =utype;
    }
    
   public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
