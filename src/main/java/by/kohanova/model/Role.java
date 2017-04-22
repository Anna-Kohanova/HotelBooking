package by.kohanova.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "role")
public class Role implements Serializable, GrantedAuthority {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    public int id;

    @Column(name = "type")
    public String type;

    @Override
    @JsonIgnore
    public String getAuthority() {
        return type;
    }
}
