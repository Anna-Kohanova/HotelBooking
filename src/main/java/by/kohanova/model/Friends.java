package by.kohanova.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "friends")
public class Friends implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne
    @JoinColumn(name = "user_alfa")
    public User userAlfa;

    @ManyToOne
    @JoinColumn(name = "user_beta")
    public User userBeta;

    @Column
    public boolean status;

    @Override
    public boolean equals(Object obj) {
        if (obj == null)
            return false;
        if (!(obj instanceof Friends))
            return false;
        Friends other = (Friends) obj;
        return id != null && id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id.hashCode();
    }
}
