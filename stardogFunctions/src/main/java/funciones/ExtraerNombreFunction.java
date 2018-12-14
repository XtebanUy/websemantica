package funciones;
import com.complexible.stardog.plan.filter.functions.string.StringFunction;
import com.stardog.stark.Namespaces;
import com.stardog.stark.Value;
import com.stardog.stark.Datatype;
import com.stardog.stark.Literal;
import com.complexible.stardog.plan.filter.ExpressionVisitor;
import com.complexible.stardog.plan.filter.expr.ValueOrError;
import com.complexible.stardog.plan.filter.functions.AbstractFunction;
import com.complexible.stardog.plan.filter.functions.Function; 

import static com.stardog.stark.Values.literal;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class ExtraerNombreFunction extends AbstractFunction  implements StringFunction {
	static final Pattern pattern;
	
	
	static {
		pattern = Pattern.compile("^(?:(?:Dr|Ing|Qu\\u00EDm|Agrim|Br|Elect|Civil|Comp|Prof)[\\. ] *)*(.+)$");
	}
	

	
	protected ExtraerNombreFunction() {
		super(1, Namespaces.STARDOG+"ExtraerNombre");
	}
	
	protected ExtraerNombreFunction(final AbstractFunction theFunction) {
		super(theFunction);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Function copy() {
		// TODO Auto-generated method stub
		return new ExtraerNombreFunction(this);
	}

	@Override
	public void accept(ExpressionVisitor arg0) {
		// TODO Auto-generated method stub
		arg0.visit(this);
	}

	@Override
	protected ValueOrError internalEvaluate(Value... arg0) {
		// TODO Auto-generated method stub
		assertStringLiteral(arg0[0]);
		final String valor = ((Literal)arg0[0]).label();
		Matcher m = pattern.matcher(valor);
		if (m.matches())
		{
			return ValueOrError.General.of(literal(m.group(1), Datatype.STRING));
		}
		
		return ValueOrError.General.of(literal(valor, Datatype.STRING));
	}

}